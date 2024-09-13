import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from './dto/login-user.input';
import { Users } from '../user/user.entity';
import { LOGIN_ERROR_MESSAGE, LOGIN_TEMPLATE_ERROR } from '../user/user.constants';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(data: UserLogin): Promise<any> {
    return this.userService.validateUser(data);
  }

  async createLog(endpoint:string , input: any, user_id: string): Promise<any> {
    return this.prisma.logs.create({ data: { endpoint, input, user_id } });
  }

  async login(user: Users, req: Request) {
    if (!user) throw new UnauthorizedException([LOGIN_ERROR_MESSAGE]);
    try {
      Reflect.deleteProperty(user, 'password');

      const endpoint = process.env.ENPOINT + req.originalUrl;

      await this.createLog(endpoint, { email: user.email, password: 'secret' }, user.id);

      return {
        user,
        token: this.jwtService.sign(user, { expiresIn: '1d' })
      };
    } catch (error) {
      console.error(error.message);
      throw new UnauthorizedException([LOGIN_TEMPLATE_ERROR])
    }
  }
}
