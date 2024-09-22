/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateJobDto {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsNotEmpty()
  @IsString()
  short_description: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString()
  skills?: string[];

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  lang: number;
}
