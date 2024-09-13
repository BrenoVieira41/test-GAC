import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { ID_ERROR_MESSAGE } from '../transfer.constants';

export class GetTransferInput {
  @ApiProperty({ default: randomUUID() })
  @IsUUID('4', { message: ID_ERROR_MESSAGE })
  id: string;
}
