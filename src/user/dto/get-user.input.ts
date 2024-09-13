import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { EMAIL_ERROR_MESSAGE, ID_ERROR_MESSAGE } from '../user.constants';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class GetUserInput {
  @ApiProperty({ default: randomUUID() })
  @IsOptional()
  @IsUUID('4', { message: ID_ERROR_MESSAGE })
  id?: string;

  @ApiProperty({ example: 'test@test.com' })
  @IsOptional()
  @IsEmail({}, { message: EMAIL_ERROR_MESSAGE })
  email?: string;
}
