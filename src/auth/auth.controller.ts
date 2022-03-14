import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';

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
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);

    if (!result) {
      return new HttpException('Wrong data', HttpStatus.BAD_REQUEST);
    }

    return result._id;
  }

  @Get('users')
  users() {
    return 1;
  }
}
