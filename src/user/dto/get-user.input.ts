import { IsEmail, IsOptional, IsUUID } from 'class-validator';
import { EMAIL_ERROR_MESSAGE, ID_ERROR_MESSAGE } from '../user.constants';

export class GetUserInput {
  @IsOptional()
  @IsUUID('4', { message: ID_ERROR_MESSAGE })
  id?: string;

  @IsOptional()
  @IsEmail({}, { message: EMAIL_ERROR_MESSAGE })
  email?: string;
}
