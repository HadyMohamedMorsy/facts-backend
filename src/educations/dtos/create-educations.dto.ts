/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { EducationDetailDto } from "./educations.dto";

export class CreateEducationsDto {
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

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImage: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDetailDto)
  education: EducationDetailDto[];

  @IsOptional()
  @IsString()
  duration: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  students_number: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  lessons_number: number;

  @IsOptional()
  @IsString()
  skill_level: string;

  @IsOptional()
  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  quizzes: string;

  @IsOptional()
  @IsString()
  certifications: string;

  @IsOptional()
  @IsString()
  percentage: string;

  @IsOptional()
  @IsDate()
  deadline: string;

  @IsOptional()
  @IsString()
  instructor: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  lang: number;
}
