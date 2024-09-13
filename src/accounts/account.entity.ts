import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Users } from '../user/user.entity';
import { Decimal } from '@prisma/client/runtime/library';

export enum UpdateValeuEnum {
  add = 'add',
  remove = 'remove'
}
export class Accounts {
  @ApiProperty({ default: randomUUID() })
  id: string;

  @ApiProperty({ default: '25.50' })
  value: string | Decimal;

  @ApiProperty({ default: new Date() })
  created_at: Date;

  @ApiProperty({ default: false })
  is_active: Boolean;

  @ApiProperty({ default: randomUUID() })
  user_id: string;

  @ApiProperty({ default: Users })
  user?: Users;
}
