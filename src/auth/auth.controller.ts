import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegistrationDto) {
    const user = await this.authService.registration(dto);

    if (!user) {
      return new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    return user._id;
  }

  @Post('login')
  login() {
    return 1;
  }

  @Get('users')
  users() {
    return 1;
  }
}
