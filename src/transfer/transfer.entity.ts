import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class Transfers {
  @ApiProperty({ default: randomUUID() })
  id: string;
}
