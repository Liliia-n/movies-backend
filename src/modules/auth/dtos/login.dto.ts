import { IsString, IsEmail, IsBoolean, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  rememberMe: boolean;
}
