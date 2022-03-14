import * as bcrypt from 'bcrypt';

export const getHashedPassword = (password: string, salt: number): string =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(salt));

export const isPasswordMatch = (hPassword: string, password: string): boolean =>
  bcrypt.compareSync(password, hPassword);
