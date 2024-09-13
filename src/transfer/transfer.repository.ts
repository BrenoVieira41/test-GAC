import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferInput } from './dto/create-transfer.input';

@Injectable()
export class TransferRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransferInput, sender_id: string, code: string) {
    try {
      const user = await this.prisma.transfer.create({
        data: {
          ...data,
          sender_id,
          code,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async getTransferByCode(code: string) {
    try {
      const user = await this.prisma.transfer.findFirst({
        where: {
          code
        },
        include: {
          recipient: true,
          sender: true
        }
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async getTransferById(id: string) {
    try {
      const user = await this.prisma.transfer.findFirst({
        where: {
          id
        },
        include: {
          recipient: true,
          sender: true
        }
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async validateFour(data: string[]) {
    try {
      const user = await this.prisma.transfer.findMany({
        where: { code: { in: data } },
        select: { code: true },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }
}
