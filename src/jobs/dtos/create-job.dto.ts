/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
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

  @IsEnum(TYPE, { message: "Type must be either parttime or fulltime" })
  @IsNotEmpty()
  type: TYPE;

  @IsNumber()
  @Type(() => Number)
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
