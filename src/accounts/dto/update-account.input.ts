import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { IsBoolean, IsDecimal, IsEnum } from 'class-validator';
import { UpdateValeuEnum } from '../account.entity';
import { ACTIVE_ERROR_MESSAGE, UPDATE_VALUE_ACCOUNT_MESSAGE, VALUE_ERROR_MESSAGE } from '../account.constants';

export class ActiveAccountInput {
  @ApiProperty({ default: true })
  @IsBoolean({ message: ACTIVE_ERROR_MESSAGE })
  is_active: boolean;
}

export class UpdateValueAccountInput {
  @ApiProperty({ default: '20.50' })
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: VALUE_ERROR_MESSAGE })
  value: string;

  @ApiProperty({ default: 'add' })
  @IsEnum(UpdateValeuEnum, { message: UPDATE_VALUE_ACCOUNT_MESSAGE })
  difference: UpdateValeuEnum;
}
