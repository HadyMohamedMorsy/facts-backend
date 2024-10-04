/* eslint-disable prettier/prettier */
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
import { TYPE } from "../enum/enum";

export class CreateJobDto extends BaseDto {
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

  @IsEnum(TYPE, { message: "Type must be either parttime or fulltime" })
  @IsNotEmpty()
  type: TYPE;

  @IsNumber()
  @IsNotEmpty()
  sallary: number;

  @IsNotEmpty()
  @IsString()
  short_description_en: string;

  @IsNotEmpty()
  @IsString()
  short_description_ar: string;

  @IsNotEmpty()
  @MaxLength(1024)
  featuredImage: string;

  @IsNotEmpty()
  @IsString()
  description_en: string;

  @IsNotEmpty()
  @IsString()
  description_ar: string;
}
