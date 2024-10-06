/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
export class CreateServiceDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name_en: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name_ar: string;

  @IsString()
  featuredImage: string;
}
