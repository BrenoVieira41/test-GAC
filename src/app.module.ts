import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthLoggerInterceptor } from './auth/auth-logger.interceptor';
import { AccountModule } from './accounts/account.module';
import { TransferModule } from './transfer/transfer.module';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, AccountModule, TransferModule],
  controllers: [AppController, AccountController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthLoggerInterceptor,
    },
    AccountService,
  ],
})
export class AppModule {}
