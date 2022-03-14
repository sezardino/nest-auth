import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHashedPassword, isPasswordMatch, Roles } from 'src/common';

import { Role, RoleDocument, User, UserDocument } from 'src/models';
import { LoginDto, RegistrationDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private configService: ConfigService,
  ) {}

  async registration(dto: RegistrationDto): Promise<false | UserDocument> {
    const { email, name, password } = dto;

    const existedUser = await this.userModel.findOne({ email });

    if (existedUser) {
      return false;
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

  async login(dto: LoginDto): Promise<UserDocument | false> {
    const { email, password } = dto;
    const neededUser = await this.userModel.findOne({ email });

    if (!neededUser) {
      return false;
    }

    const passwordMatch = isPasswordMatch(password, neededUser.password);

    if (!passwordMatch) {
      return false;
    }

    return neededUser;
  }
}
