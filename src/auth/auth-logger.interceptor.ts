import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { USER_NOT_FOUND } from '../user/user.constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthLoggerInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        let input = null;
        const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        const user = await this.userService.getUser({ id: decoded.id });

        if (!user) throw new UnauthorizedException(USER_NOT_FOUND);

        if (!!request.body) input = request.body;
        const endpoint = process.env.ENPOINT + request.originalUrl;

        await this.authService.createLog(endpoint, input, user.id );

        return next.handle();
      } catch (error) {
        throw new UnauthorizedException([error.message]);
      }
    } else {
      return next.handle();
    }
  }
}
