import { UserRepository } from './../user/user.repository';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountInput } from './dto/create-account.input';
import { Accounts, UpdateValeuEnum } from './account.entity';
import {
  ACCOUNT_NOT_FOUND,
  ACTIVE_ERROR_MESSAGE,
  ACTIVE_SUCCESS_MESSAGE,
  CREATE_ERROR_MESSAGE,
  DEPOSIT_ERROR_MESSAGE,
  DEPOSIT_SUCCESS_MESSAGE,
  DISABLE_SUCCESS_MESSAGE,
  GET_ERROR_MESSAGE,
  REMOVE_SUCCESS_MESSAGE,
  USER_ALREADY_HAS_ACCOUNT,
  USER_NOT_FOUND,
  VALUE_MIN_ERROR_MESSAGE,
  VALUE_NOT_FOUND,
} from './account.constants';
import { UpdateValueAccountInput } from './dto/update-account.input';
import { GetAccountInput } from './dto/get-account.input';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateAccountInput, user_id: string): Promise<any> {
    const user = await this.userRepository.get({ id: user_id });
    await this.accountAlreadyExist(user.id);
    if (!user) throw new UnauthorizedException([USER_NOT_FOUND]);

    try {
      const account = await this.accountRepository.create(data, user.id);
      return account;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([CREATE_ERROR_MESSAGE]);
    }
  }

  async get(data: GetAccountInput) {
    const { user_id, id } = data;

    if (!user_id && !id) throw new UnauthorizedException([VALUE_NOT_FOUND]);

    try {
      const account: Accounts = await this.accountRepository.get({ user_id, id });
      return account;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([GET_ERROR_MESSAGE]);
    }
  }

  async activeAccount(is_active: boolean, user_id: string): Promise<any> {
    const account: Accounts = await this.accountRepository.get({ user_id });
    if (!account) throw new BadRequestException([ACCOUNT_NOT_FOUND]);
    if (account.is_active === is_active) throw new BadRequestException([VALUE_NOT_FOUND]);

    try {
      let response = is_active ? ACTIVE_SUCCESS_MESSAGE : DISABLE_SUCCESS_MESSAGE;

      await this.accountRepository.activeAccount(account.id, is_active);
      return response;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([ACTIVE_ERROR_MESSAGE]);
    }
  }

  async depositAccount(data: UpdateValueAccountInput, user_id: string): Promise<any> {
    const account: Accounts = await this.accountRepository.get({ user_id });
    if (!account) throw new BadRequestException([ACCOUNT_NOT_FOUND]);

    const currentValue = parseFloat(String(account.value));
    let newValue =
      data.difference === UpdateValeuEnum.add
        ? (currentValue + parseFloat(data.value)).toPrecision(2)
        : (currentValue - parseFloat(data.value)).toFixed(2);

    if (Number(newValue) < 0) throw new BadRequestException([VALUE_MIN_ERROR_MESSAGE]);

    try {
      await this.accountRepository.depositAccount(account.id, String(newValue));
      let response = data.difference === UpdateValeuEnum.add ? DEPOSIT_SUCCESS_MESSAGE : REMOVE_SUCCESS_MESSAGE;
      return response;
    } catch (error) {
      console.error(error.message);
      throw new InternalServerErrorException([DEPOSIT_ERROR_MESSAGE]);
    }
  }

  private async accountAlreadyExist(user_id: string) {
    const accountAlreadyExist = await this.accountRepository.get({ user_id });

    if (accountAlreadyExist) throw new BadRequestException([USER_ALREADY_HAS_ACCOUNT]);
  }
}
