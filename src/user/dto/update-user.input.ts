import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class UpateUserInput {
  @IsOptional()
  @IsString({ message: 'NAME_ERROR_MESSAGE' })
  @MinLength(3, { message: 'NAME_ERROR_MESSAGE' })
  @MaxLength(250, { message: 'NAME_ERROR_MESSAGE' })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'EMAIL_ERROR_MESSAGE' })
  email: string;

  @IsOptional()
  @IsString({ message: 'BORNDATE_ERROR_MESSAGE' })
  borndate: string;

  @IsOptional()
  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'PASSWORD_ERROR_MESSAGE' },
  )
  password: string;

  @IsOptional()
  @IsString({ message: 'CODE_ERROR_MESSAGE' })
  code: string;
}

export class ActiveUserInput {
  @IsBoolean({ message: 'ACTIVE_ERROR_MESSAGE' })
  is_active: string;
}
