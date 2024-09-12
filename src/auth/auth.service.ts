import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from './dto/login-user.input';
import { Users } from '../user/user.entity';
import { LOGIN_ERROR_MESSAGE } from '../user/user.constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: UserLogin): Promise<any> {
    return this.userService.validateUser(data);
  }

  async login(user: Users) {
    if (!user) throw new UnauthorizedException([LOGIN_ERROR_MESSAGE]);

    Reflect.deleteProperty(user, 'password');

    return {
      user,
      token: this.jwtService.sign(user, { expiresIn: '1d' })
    };
  }
}
