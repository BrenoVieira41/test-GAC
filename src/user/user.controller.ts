import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UseValidationPipe } from '../utils/decorators/validation.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { Users } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseValidationPipe()
  async create(@Body() data: CreateUserInput, @Res() res): Promise<Users> {
    const user = await this.userService.create(data);
    return res.status(201).json(user);
  }
}
