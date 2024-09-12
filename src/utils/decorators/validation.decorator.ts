import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function UseValidationPipe() {
  return UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    stopAtFirstError: true,
    transform: true,
    validateCustomDecorators: true,
  }));
}
