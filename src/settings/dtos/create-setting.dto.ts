/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateSettingDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  section_name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  title_en: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  title_ar: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  link: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsOptional()
  @IsString()
  description_en: string;

  @IsOptional()
  @IsString()
  description_ar: string;

  @IsOptional()
  @IsString()
  short_description_en: string;

  @IsOptional()
  @IsString()
  short_description_ar: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  featuredImage: string;

  @IsOptional()
  @IsString()
  screen_shot: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;
}
