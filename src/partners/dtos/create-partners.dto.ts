/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreatePartnersDto extends BaseDto {
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
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  link: string;

  @IsNotEmpty()
  @IsString()
  description_en: string;

  @IsNotEmpty()
  @IsString()
  description_ar: string;

  @IsString()
  featuredImage: string;
}
