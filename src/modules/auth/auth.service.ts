import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { UserService } from "../user/user.service";
import { PasswordService } from "./services/password.service";
import { JwtService } from "./services/jwt.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "../user/entity/user.entity";
import { LoginResponse } from "./types/login.response";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService
  ) {}

  private readonly SET_TOKEN_EXPIRATION = this.configService.get<string>(
    "SET_TOKEN_EXPIRATION"
  );
  private readonly DEFAULT_TOKEN_EXPIRATION = this.configService.get<string>(
    "DEFAULT_TOKEN_EXPIRATION"
  );

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password, rememberMe } = loginDto;

    const user = await this.userService.getUserByEmail(email);

    const unathorizedException = new HttpException(
      "Invalid credentials",
      HttpStatus.UNAUTHORIZED
    );

    if (!user) {
      throw unathorizedException;
    }

    const passwordValid = await this.passwordService.verifyPassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw unathorizedException;
    }

    const tokenPayload = { email: user.email, sub: user.id };

    const expiresIn = rememberMe
      ? this.SET_TOKEN_EXPIRATION
      : this.DEFAULT_TOKEN_EXPIRATION;

    const accessToken = this.jwtService.sign(tokenPayload, expiresIn);

    return { accessToken };
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;

    const userExists = await this.userService.getUserByEmail(email);

    if (userExists) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.passwordService.hashPassword(password);

    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}
