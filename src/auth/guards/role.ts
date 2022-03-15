import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload, Roles } from 'src/common';
import * as messages from '../messages';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const jwtPayload = this.jwtService.decode(
      request.headers.authorization.split(' ')[1],
    ) as JWTPayload;

    const result = jwtPayload.roles.some((role: Roles) => roles.includes(role));

    if (!result) {
      throw new NotAcceptableException(messages.NO_PERMISSIONS);
    }

    return jwtPayload.roles.some((role: Roles) => roles.includes(role));
  }
}
