/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
import { createUserGraduatesDto } from "./create-graduates-users.dto";

export class CreateGraduatestDto extends BaseDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  user: number;

  @ValidateNested({ each: true })
  @Type(() => createUserGraduatesDto)
  selectUser: createUserGraduatesDto;

  @IsString()
  @IsNotEmpty()
  description_en: string;

  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @IsArray()
  @Type(() => String)
  @IsNotEmpty()
  courses: string[];

  @IsString()
  featuredImage: string;

  @IsString()
  @IsNotEmpty()
  attachment: string;
}
