import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Users } from '../../user/user.entity';
import { LOGIN_ERROR_MESSAGE } from '../../user/user.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this.authService.validateUser({email, password});
    if (!user) {
      throw new UnauthorizedException([LOGIN_ERROR_MESSAGE]);
    }
    return user;
  }
}
