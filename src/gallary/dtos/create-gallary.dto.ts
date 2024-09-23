/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateGallarysDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title: string;

  @IsArray()
  @MaxLength(1024)
  featuredImages: string[];
}
