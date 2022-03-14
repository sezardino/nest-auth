import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHashedPassword, isPasswordMatch, Roles } from 'src/common';

import { Role, RoleDocument, User, UserDocument } from 'src/models';
import { LoginDto, RegistrationDto } from './dto';
import * as messages from './messages';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async registration(dto: RegistrationDto): Promise<UserDocument> {
    const { email, name, password } = dto;

    const result = await this.userModel.findOne({ email });

    if (result) {
      throw new UnauthorizedException(messages.USER_ALREADY_EXIST);
    }

    const userRole = await this.roleModel.findOne({ value: Roles.USER });
    const salt = this.configService.get('SALT') as string;
    const hashedPassword = getHashedPassword(password, +salt);
    const newUser = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
      roles: [userRole],
    });

    newUser.save();

    return newUser;
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const { email, password } = dto;
    const neededUser = await this.validateUser(email);

    const passwordMatch = isPasswordMatch(neededUser.password, password);

    if (!passwordMatch) {
      throw new UnauthorizedException(messages.PASSWORD_MISMATCH);
    }

    const payload = { email, role: neededUser.roles };

    return { token: await this.jwtService.signAsync(payload) };
  }

  async validateUser(email: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({ email });

    if (!result) {
      throw new UnauthorizedException(messages.USER_NOT_FOUND);
    }

    return result;
  }
}
