import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { IsDecimal, IsUUID } from 'class-validator';
import { RECIPIENT_ERRO_MESSAGE, VALUE_ERROR_MESSAGE } from '../transfer.constants';

export class CreateTransferInput {
  @ApiProperty({ default: randomUUID() })
  @IsUUID('4', { message: RECIPIENT_ERRO_MESSAGE })
  recipient_id: string;

  @ApiProperty({ default: '20.50' })
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: VALUE_ERROR_MESSAGE })
  value: string;
}
