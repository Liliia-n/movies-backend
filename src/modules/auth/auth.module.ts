import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { PasswordService } from "./services/password.service";
import { JwtService } from "./services/jwt.service";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtService],
})
export class AuthModule {}
