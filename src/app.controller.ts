import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Base')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  isOnline(): string {
    return this.appService.isOnline();
  }
}
