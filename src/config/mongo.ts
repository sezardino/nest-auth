import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => ({
  uri: configService.get('MONGO_URL'),
  useNewUrlParser: true,
});
