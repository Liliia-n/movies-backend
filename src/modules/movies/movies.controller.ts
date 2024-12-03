import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateMovieDto } from "./dtos/create-movie.dto";
import { UpdateMovieDto } from "./dtos/update-movie.dto";
import { Movie } from "./entity/movie.entity";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(":id")
  async getMovieById(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Patch(":id")
  async updateMovie(
    @Param("id") id: string,
    @Body() updateMovieDto: UpdateMovieDto
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }
}
