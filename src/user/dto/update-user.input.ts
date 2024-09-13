import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class UpdateUserInput {
  @ApiProperty({ maxLength: 250, minLength: 3 })
  @IsOptional()
  @IsString({ message: 'NAME_ERROR_MESSAGE' })
  @MinLength(3, { message: 'NAME_ERROR_MESSAGE' })
  @MaxLength(250, { message: 'NAME_ERROR_MESSAGE' })
  name: string;

  @ApiProperty({ example: 'test@test.com' })
  @IsOptional()
  @IsEmail({}, { message: 'EMAIL_ERROR_MESSAGE' })
  email: string;

  @ApiProperty({ example: '22/08/2000' })
  @IsOptional()
  @IsString({ message: 'BORNDATE_ERROR_MESSAGE' })
  borndate: string | Date;

  @ApiProperty({ example: 'SenhaTest123!' })
  @IsOptional()
  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'PASSWORD_ERROR_MESSAGE' },
  )
  password: string;

  @ApiProperty({ example: '1239' })
  @IsOptional()
  @IsString({ message: 'CODE_ERROR_MESSAGE' })
  code: string;
}
