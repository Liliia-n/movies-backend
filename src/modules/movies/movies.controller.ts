import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { CreateMovieDto } from "./dtos/create-movie.dto";
import { UpdateMovieDto } from "./dtos/update-movie.dto";
import { Movie } from "./entity/movie.entity";
import { MoviesService } from "./movies.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/guards/auth.guard";
import { GetUser } from "src/decorators/get-user.decorator";

@Controller("movies")
@UseGuards(AuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(":id")
  async getMovieById(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor("movieImg"))
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() movieImg: Express.Multer.File,
    @GetUser("sub") userId: string
  ): Promise<Movie> {
    if (!movieImg) {
      throw new HttpException("Image is required", HttpStatus.BAD_REQUEST);
    }

    return this.moviesService.createMovie(createMovieDto, movieImg, userId);
  }

  @Patch(":id")
  async updateMovie(
    @Param("id") id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @GetUser("sub") userId: string
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, updateMovieDto, userId);
  }
}
