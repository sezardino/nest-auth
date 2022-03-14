import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
  config: ConfigService,
): Promise<JwtModuleOptions> => ({ secret: config.get('JWS_SECRET') });
