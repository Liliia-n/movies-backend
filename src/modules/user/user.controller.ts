import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entity/user.entity";
import { Movie } from "../movies/entity/movie.entity";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get(":id/movies")
  async getUserMovies(@Param("id") id: string): Promise<Movie[]> {
    return this.userService.getUserMovies(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
