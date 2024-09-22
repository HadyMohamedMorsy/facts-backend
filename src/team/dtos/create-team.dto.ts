/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTeamDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsArray()
  @IsNotEmpty()
  phone_number: number[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString()
  social_links?: string[];

  @MaxLength(1024)
  featuredImage: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  lang: number;
}
