import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository]
})
export class AccountModule {}
