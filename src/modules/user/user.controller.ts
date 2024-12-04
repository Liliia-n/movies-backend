import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { GetUser } from "src/decorators/get-user.decorator";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entity/user.entity";
import { Movie } from "../movies/entity/movie.entity";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get("movies")
  async getUserMovies(@GetUser("sub") id: string): Promise<Movie[]> {
    return this.userService.getUserMovies(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
}
