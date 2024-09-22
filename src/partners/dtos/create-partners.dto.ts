/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePartnersDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @MaxLength(1024)
  featuredImage: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  lang: number;
}
