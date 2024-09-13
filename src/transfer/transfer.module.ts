import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TransferRepository } from './transfer.repository';
import { AccountModule } from '../accounts/account.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AccountModule, UserModule],
  controllers: [TransferController],
  providers: [TransferService, TransferRepository]
})
export class TransferModule {}
