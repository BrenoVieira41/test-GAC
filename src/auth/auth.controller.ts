import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/login-user.input';
import { UseValidationPipe } from '../utils/decorators/validation.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseValidationPipe()
  async login(@Body() body: UserLogin) {
    const user = await this.authService.validateUser(body);
    return this.authService.login(user);
  }
}
