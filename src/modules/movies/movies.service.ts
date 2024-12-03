import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Movie } from "./entity/movie.entity";
import { CreateMovieDto } from "./dtos/create-movie.dto";
import { UpdateMovieDto } from "./dtos/update-movie.dto";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
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
    const movie = this.movieRepository.create(createMovieDto);

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
