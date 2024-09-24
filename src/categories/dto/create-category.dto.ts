/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;
}
