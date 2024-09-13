import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthLoggerInterceptor } from './auth-logger.interceptor';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, AuthLoggerInterceptor],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
