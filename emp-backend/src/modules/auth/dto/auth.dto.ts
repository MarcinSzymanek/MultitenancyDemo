import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  tenantId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  tenantId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumberString()
  utcOffset: string;
}
