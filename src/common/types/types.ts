import { Roles } from './enums';

export interface JWTPayload {
  email: string;
  roles: Roles[];
  iat: number;
}
