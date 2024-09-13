import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TransferRepository } from './transfer.repository';
import { AccountModule } from '../accounts/account.module';

@Module({
  imports: [AccountModule],
  controllers: [TransferController],
  providers: [TransferService, TransferRepository]
})
export class TransferModule {}
