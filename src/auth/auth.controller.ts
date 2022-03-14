import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';
import { JwtGuard } from './guards/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegistrationDto) {
    const user = await this.authService.registration(dto);

    return user;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);

    return result;
  }

  @UseGuards(JwtGuard)
  @Get('users')
  users() {
    return 1;
  }
}
