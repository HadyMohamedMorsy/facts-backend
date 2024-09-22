/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {
  IsArray,
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
import { ConsultancyDetailDto } from "./consultancy.dto";

export class CreateConsultancyDto {
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
  @Type(() => ConsultancyDetailDto)
  consultancy: ConsultancyDetailDto;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  lang: number;
}
