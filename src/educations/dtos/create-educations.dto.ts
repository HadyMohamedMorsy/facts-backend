/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
import { EducationDetailsDto } from "./details-education.dto";
import { EducationAccordion } from "./educations.dto";

export class CreateEducationsDto extends BaseDto {
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

  @MaxLength(1024)
  featuredImage: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationAccordion)
  education_accordion: EducationAccordion[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDetailsDto)
  education_details: EducationDetailsDto[];
}
