import * as bcrypt from 'bcrypt';

export const getHashedPassword = (password: string, salt: number): string =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(salt));
