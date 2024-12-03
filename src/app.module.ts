import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { databaseConfig } from "./database/database-config";
import { AuthModule } from "./modules/auth/auth.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    MoviesModule,
    UserModule,
  ],
})
export class AppModule {}
