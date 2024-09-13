import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class Accounts {
  @ApiProperty({ default: randomUUID() })
  id: string;
}
