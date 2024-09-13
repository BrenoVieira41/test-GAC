import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export enum AccountStatus {
  pending = 'pending',
  paid = 'paid',
  refund = 'refund',
}

export class Transfers {
  @ApiProperty({ default: randomUUID() })
  id: string;
}
