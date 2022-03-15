import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDocument } from 'src/models';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWS_SECRET'),
      passReqToCallback: true,
      ignoreExpiration: false,
      expiresIn: '3 days',
    });
  }

  async validate(
    payload: Pick<UserDocument, 'roles' | 'email'>,
  ): Promise<Pick<UserDocument, 'roles' | 'email'>> {
    return payload;
  }
}
