/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
import { createMagazineBlogDto } from "./create-magazine-blog.dto";

export class CreateBlogsDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  title_ar: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  meta_title_en: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  meta_title_ar: string;

  @IsString()
  @IsOptional()
  meta_description_en: string;

  @IsString()
  @IsOptional()
  meta_description_ar: string;

  @IsString()
  @IsOptional()
  short_description_en: string;

  @IsString()
  @IsOptional()
  short_description_ar: string;

  @IsString()
  description_en: string;

  @IsString()
  description_ar: string;

  @IsNotEmpty()
  featuredImage: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  magazine: number;

  @ValidateNested({ each: true })
  @Type(() => createMagazineBlogDto)
  selectMagazine: createMagazineBlogDto;
}
