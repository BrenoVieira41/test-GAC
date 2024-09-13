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

@Module({
  imports: [PrismaModule, UserModule, AuthModule, AccountModule, TransferModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthLoggerInterceptor,
    },
  ],
})
export class AppModule {}
