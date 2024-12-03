import { IsInt, IsOptional, IsString, Max, MaxLength } from "class-validator";

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsInt()
  @Max(new Date().getFullYear())
  publishingYear?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
