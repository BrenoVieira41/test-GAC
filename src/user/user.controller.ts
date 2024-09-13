import { Body, Controller, Delete, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UseValidationPipe } from '../utils/decorators/validation.decorator';
import { CreateUserInput } from './dto/create-user.input';
import { Users } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DELETE_SUCCESS_MESSAGE, UPDATE_SUCCESS_MESSAGE } from './user.constants';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseValidationPipe()
  @ApiOkResponse({
    description: 'OK',
    type: Users,
  })
  async create(@Body() data: CreateUserInput, @Res() res): Promise<Users> {
    const user = await this.userService.create(data);
    return res.status(201).json(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: Users,
  })
  async me(@Req() req, @Res() res): Promise<Users> {
    const user = await this.userService.getUser(req.user);
    return res.status(201).json(user);
  }

  @Put()
  @UseValidationPipe()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: UPDATE_SUCCESS_MESSAGE,
  })
  async update(@Req() req, @Body() data: UpdateUserInput, @Res() res): Promise<string> {
    const { id } = req.user;

    const user = await this.userService.update(id, data);
    return res.status(201).json(user);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: DELETE_SUCCESS_MESSAGE,
  })
  async delete(@Req() req, @Res() res): Promise<string> {
    const { id } = req.user;

    const response = await this.userService.delete(id);
    return res.status(200).json(response);
  }
}
