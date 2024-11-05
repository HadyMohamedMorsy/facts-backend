/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { createUserGraduatesDto } from "./create-graduates-users.dto";

export class CreateGraduatestDto {
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
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  course_name: string;

  @IsString()
  @IsOptional()
  code_certification: string;

  @IsString()
  @IsOptional()
  date_course: string;

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
  image_certification: string;

  @IsString()
  attachment: string;
}
