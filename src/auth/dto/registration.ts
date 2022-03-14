import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(8)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
