import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransferService } from './transfer.service';
import { UseValidationPipe } from '../utils/decorators/validation.decorator';
import { CreateTransferInput } from './dto/create-transfer.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Transfers } from './transfer.entity';
import { GetTransferInput } from './dto/get-transfer.input';
import { CREATE_SUCCESS_MESSAGE } from './transfer.constants';

@Controller('transfer')
@ApiTags('Transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post()
  @UseValidationPipe()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: Transfers,
  })
  async create(@Req() req, @Body() data: CreateTransferInput, @Res() res): Promise<Transfers> {
    const user_id = req.user.id;
    const transfer = await this.transferService.create(data, user_id);
    return res.status(201).json(transfer);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'OK',
    type: Transfers,
  })
  async get(@Req() req, @Param('id') { id }: GetTransferInput, @Res() res): Promise<Transfers> {
    const user_id = req.user;
    const user = await this.transferService.get({id}, user_id);
    return res.status(200).json(user);
  }

  @Post('pay/:code')
  @UseValidationPipe()
  @ApiOkResponse({
    description: 'OK',
    type: CREATE_SUCCESS_MESSAGE,
  })
  async pay(@Req() req, @Param('code') code: string, @Res() res): Promise<Transfers> {
    const transfer = await this.transferService.pay(code);
    return res.status(201).json(transfer);
  }
}
