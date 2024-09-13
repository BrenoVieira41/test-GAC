import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';
import { Accounts } from 'src/accounts/account.entity';

export enum TransferStatus {
  pending = 'pending',
  paid = 'paid',
  refund = 'refund',
}

export class Transfers {
  @ApiProperty({ default: randomUUID() })
  id: string;

  @ApiProperty({ default: '25.50' })
  value: string | Decimal;

  @ApiProperty({ default: randomUUID() })
  recipient_id: string;

  @ApiProperty({ default: randomUUID() })
  sender_id: string;

  @ApiProperty({ default: new Date() })
  date: Date;

  @ApiProperty({ default: '123456' })
  code: string;

  @ApiProperty({ default: TransferStatus.pending })
  status: TransferStatus;

  @ApiProperty({ default: Accounts })
  recipient?: Accounts

  @ApiProperty({ default: Accounts })
  sender?: Accounts
}
