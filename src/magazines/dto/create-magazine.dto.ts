/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
export class CreateMagazineDto extends BaseDto {
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
}
