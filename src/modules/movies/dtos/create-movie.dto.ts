import {
  IsString,
  IsInt,
  IsOptional,
  MaxLength,
  Max,
  IsUUID,
} from "class-validator";

export class CreateMovieDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsInt()
  @Max(new Date().getFullYear())
  publishingYear: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsUUID()
  userId: string;
}
