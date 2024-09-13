import { IsNumberString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { ID_ERROR_MESSAGE } from '../transfer.constants';
import { CODE_ERROR_MESSAGE } from '../../user/user.constants';

export class GetTransferInput {
  @ApiProperty({ default: randomUUID() })
  @IsUUID('4', { message: ID_ERROR_MESSAGE })
  id: string;
}

export class UserCode {
  @ApiProperty({ example: '1239' })
  @IsNumberString({ no_symbols: true }, { message: CODE_ERROR_MESSAGE })
  code: string;
}
