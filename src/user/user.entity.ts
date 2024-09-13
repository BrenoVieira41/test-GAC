import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class Users {
  @ApiProperty({ default: randomUUID() })
  id: string;

  @ApiProperty({ maxLength: 250, minLength: 3 })
  name: string;

  @ApiProperty({ default: 'test@test.com' })
  email: string;

  @ApiProperty({ default: '22/08/2000' })
  borndate: Date;

  @ApiProperty({ default: 'SenhaTest123!' })
  password: string;
  code: string;

  @ApiProperty({ default: '1239' })

  @ApiProperty({ default: new Date() })
  created_at: Date;

  @ApiProperty({ default: new Date() })
  updated_at: Date;

  @ApiProperty({ default: new Date() })
  deleted_at: Date;
}
