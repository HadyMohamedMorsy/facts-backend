/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
export class CreateMagazineDto {
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

  @IsString()
  short_description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImage: string;

  @IsArray()
  @IsInt()
  category_ids: number[];

  @IsInt()
  language_id: number;
}
