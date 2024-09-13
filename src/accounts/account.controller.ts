import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UseValidationPipe } from '../utils/decorators/validation.decorator';
import { CreateAccountInput } from './dto/create-account.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Accounts } from './account.entity';
import { UpdateValueAccountInput } from './dto/update-account.input';
import { ACTIVE_SUCCESS_MESSAGE, DEPOSIT_SUCCESS_MESSAGE, DISABLE_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE,  } from './account.constants';

@Controller('account')
@ApiTags('Account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  @UseValidationPipe()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: Accounts,
  })
  async create(@Req() req, @Body() data: CreateAccountInput, @Res() res): Promise<Accounts> {
    const user_id = req.user.id;
    const account = await this.accountService.create(data, user_id);
    return res.status(201).json(account);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: Accounts,
  })
  async get(@Req() req, @Res() res): Promise<Accounts> {
    const user_id = req.user.id;
    const user = await this.accountService.get({ user_id });
    return res.status(200).json(user);
  }

  @Patch('active/:is_active')
  @UseValidationPipe()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: ACTIVE_SUCCESS_MESSAGE || DISABLE_SUCCESS_MESSAGE,
  })
  async active(@Req() req, @Param('is_active') is_active: boolean, @Res() res): Promise<String> {
    const user_id = req.user.id;
    const account = await this.accountService.activeAccount(is_active, user_id);
    return res.status(200).json(account);
  }

  @Patch('deposit')
  @UseValidationPipe()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: DEPOSIT_SUCCESS_MESSAGE || REMOVE_SUCCESS_MESSAGE,
  })
  async deposit(@Req() req, @Body() data: UpdateValueAccountInput, @Res() res): Promise<String> {
    const user_id = req.user.id;
    const account = await this.accountService.depositAccount(data, user_id);
    return res.status(200).json(account);
  }
}
