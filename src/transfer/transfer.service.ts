import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { TransferRepository } from './transfer.repository';
import { CreateTransferInput } from './dto/create-transfer.input';
import { AccountRepository } from 'src/accounts/account.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Transfers, TransferStatus } from './transfer.entity';
import { GetTransferInput } from './dto/get-transfer.input';
import { ACCOUNT_NOT_FOUND, CREATE_ERROR_MESSAGE, CREATE_SUCCESS_MESSAGE, NOT_BALANCE_TO_TRANSFER, PAY_ERROR_MESSAGE, SEND_ACCOUNT_NOT_FOUND, TRANSFER_STATUS, TRANSFER_TO_ME, VALUE_NOT_FOUND } from './transfer.constants';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountRepository: AccountRepository,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateTransferInput, user_id: string): Promise<any> {
    const recipient = await this.accountRepository.getExist({ id: data.recipient_id });
    const sender = await this.accountRepository.getExist({ user_id });

    if (!recipient) throw new BadRequestException([SEND_ACCOUNT_NOT_FOUND]);
    if (!sender) throw new BadRequestException([ACCOUNT_NOT_FOUND]);

    if (recipient.id === sender.id)
      throw new BadRequestException([TRANSFER_TO_ME]);

    const code = await this.setNumbers();

    try {
      const transfer = await this.transferRepository.create(
        { value: data.value, recipient_id: recipient.id },
        sender.id,
        code,
      );
      return transfer;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([CREATE_ERROR_MESSAGE]);
    }
  }

  async get({ id }: GetTransferInput, user_id: string) {

    if (!user_id && !id) throw new UnauthorizedException([VALUE_NOT_FOUND]);

    const transfer = await this.transferRepository.getTransferById(id);

    return transfer;
  }

  async pay(code: string): Promise<String> {
    const transfer = await this.transferRepository.getTransferByCode(code);

    if (transfer.status !== 'pending') throw new BadRequestException([TRANSFER_STATUS]);
    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      try {
        const transfer = await tx.transfer.findFirst({
          where: {
            code,
            status: 'pending',
          },
          include: {
            recipient: true,
            sender: true,
          },
        });

        const transeferValue = Number(transfer.value);
        const senderBalance = Number(transfer.sender.value);

        if (senderBalance < transeferValue) throw new BadRequestException([NOT_BALANCE_TO_TRANSFER]);

        await tx.account.update({
          where: { id: transfer.sender.id },
          data: { value: { decrement: transeferValue } },
        });

        await tx.account.update({
          where: { id: transfer.recipient.id },
          data: { value: { increment: transeferValue } },
        });

        await tx.transfer.update({
          where: { id: transfer.id },
          data: { status: TransferStatus.paid },
        });

        return CREATE_SUCCESS_MESSAGE;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException(PAY_ERROR_MESSAGE);
      }
    });
  }

  private async setNumbers(): Promise<string> {
    const fourNumbers = this.generateFourNumbers();
    const validateNumbers = await this.transferRepository.validateFour(fourNumbers);
    const foundCodes = validateNumbers.map((it) => it.code);
    const notFoundCodes = fourNumbers.filter((code) => !foundCodes.includes(code));

    if (!notFoundCodes.length) await this.setNumbers();

    return notFoundCodes[0];
  }

  private generateFourNumbers() {
    const randomNumbers: string[] = [];
    let count = 0;

    while (count < 4) {
      const randomNumber = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');

      randomNumbers.push(randomNumber);
      count++;
    }

    return randomNumbers;
  }
}
