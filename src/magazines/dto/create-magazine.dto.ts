/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Category } from "src/categories/category.entity";
import { BaseDto } from "src/shared/common/base/base.dto";
import { MagazineCategoriesDto } from "./magazine-categories.dto";
export class CreateMagazineDto extends BaseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title_en: string;

  @IsString()
  @MinLength(3)
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
  short_description_en?: string;

  @IsString()
  short_description_ar?: string;

  @IsString()
  @IsOptional()
  featuredImage: string;

  @IsDateString()
  publication_date?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MagazineCategoriesDto)
  selectedCategories: MagazineCategoriesDto[];

  @IsArray()
  @Type(() => Category)
  categories: Category[];
}
