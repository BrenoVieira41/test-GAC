import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal } from 'class-validator';

export class CreateAccountInput {
  @ApiProperty({ default: '20.50' })
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: 'VALUE_ERROR_MESSAGE' })
  value: string;
}
