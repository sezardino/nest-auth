import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';
import { RoleGuard, JwtGuard } from './guards';

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

  @Get('users')
  @UseGuards(JwtGuard, RoleGuard)
  @SetMetadata('roles', [Roles.ADMIN])
  users() {
    return 1;
  }
}
