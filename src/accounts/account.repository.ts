import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountInput } from './dto/create-account.input';
import { GetAccountInput } from './dto/get-account.input';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccountInput, user_id: string) {
    try {
      const account = await this.prisma.account.create({
        data: {
          value: data.value,
          user_id,
        },
      });
      return account;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async activeAccount(id: string, is_active: boolean) {
    try {
      return this.prisma.account.update({ where: { id }, data: { is_active } });
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async depositAccount(id: string, value: string) {
    try {
      return this.prisma.account.update({ where: { id }, data: { value } });
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async get(data: GetAccountInput) {
    const { id, user_id } = data;
    try {
      const user = await this.prisma.account.findFirst({
        where: {
          OR: [{ id }, { user_id }],
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }
}
