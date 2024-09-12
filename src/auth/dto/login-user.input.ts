import { IsEmail, IsString } from 'class-validator';
import { EMAIL_ERROR_MESSAGE } from '../../user/user.constants';

export class UserLogin {
  @IsEmail({}, { message: EMAIL_ERROR_MESSAGE })
  email: string;

  @IsString({ message: 'Senha inválida.' })
  password: string;
}
