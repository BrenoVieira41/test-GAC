import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { ID_ERROR_MESSAGE, USER_ERROR_MESSAGE } from '../account.constants';

export class GetAccountInput {
  @ApiProperty({ default: randomUUID() })
  @IsOptional()
  @IsUUID('4', { message: ID_ERROR_MESSAGE })
  id?: string;

  @ApiProperty({ default: randomUUID() })
  @IsOptional()
  @IsUUID('4', { message: USER_ERROR_MESSAGE })
  user_id?: string;
}
