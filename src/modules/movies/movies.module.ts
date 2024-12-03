import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Movie } from "./entity/movie.entity";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), UserModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
