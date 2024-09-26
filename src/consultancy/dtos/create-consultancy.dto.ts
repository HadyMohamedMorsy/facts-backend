/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { ConsultancyAccordienDto } from "./consultancy-accordien.dto";
export class CreateConsultancyDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
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

  @IsNotEmpty()
  @MaxLength(1024)
  featuredImage: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsultancyAccordienDto)
  consultancyAccordion: ConsultancyAccordienDto;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  language_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;
}
