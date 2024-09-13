import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/login-user.input';
import { UseValidationPipe } from '../utils/decorators/validation.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseValidationPipe()
  @ApiResponse({
    status: 401,
    description: 'Usuário não encontrado.',
  })
  async login(@Body() body: UserLogin, @Req() req) {
    const user = await this.authService.validateUser(body);
    return this.authService.login(user, req);
  }
}
