import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserInput } from './dto/get-user.input';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserInput) {
    try {
      const user = await this.prisma.user.create({ data });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error]);
    }
  }

  async get(data: GetUserInput) {
    const { id, email } = data;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          deleted_at: null,
          OR: [{ id }, { email }],
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException([error]);
    }
  }
}
