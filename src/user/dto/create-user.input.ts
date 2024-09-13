import { IsEmail, IsNumberString, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import {
  BORNDATE_ERROR_MESSAGE,
  CODE_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from '../user.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty({ maxLength: 250, minLength: 3 })
  @IsString({ message: NAME_ERROR_MESSAGE })
  @MinLength(3, { message: NAME_ERROR_MESSAGE })
  @MaxLength(250, { message: NAME_ERROR_MESSAGE })
  name: string;

  @ApiProperty({ example: 'test@test.com' })
  @IsEmail({}, { message: EMAIL_ERROR_MESSAGE })
  email: string;

  @ApiProperty({ example: '22/08/2000' })
  @IsString({ message: BORNDATE_ERROR_MESSAGE })
  borndate: string | Date;

  @ApiProperty({ example: 'SenhaTest123!' })
  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: PASSWORD_ERROR_MESSAGE },
  )
  password: string;

  @ApiProperty({ example: '1239' })
  @IsNumberString({ no_symbols: true }, { message: CODE_ERROR_MESSAGE })
  code: string;
}
