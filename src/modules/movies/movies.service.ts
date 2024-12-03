import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserService } from "../user/user.service";
import { Movie } from "./entity/movie.entity";
import { CreateMovieDto } from "./dtos/create-movie.dto";
import { UpdateMovieDto } from "./dtos/update-movie.dto";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly userService: UserService
  ) {}

  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({
      id,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const user = await this.userService.getUserById(createMovieDto.userId);

    const movie = this.movieRepository.create({
      ...createMovieDto,
      user,
    });

    return this.movieRepository.save(movie);
  }

  async updateMovie(
    id: string,
    updateMovieDto: UpdateMovieDto
  ): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({
      id,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    Object.assign(movie, updateMovieDto);

    return this.movieRepository.save(movie);
  }
}
