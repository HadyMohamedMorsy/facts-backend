/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
import { SoicalLinkDto } from "./social-links.dto";

export class CreateTeamDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsArray()
  @IsNotEmpty()
  phone_number: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @Type(() => SoicalLinkDto)
  social_links?: SoicalLinkDto[];

  @MaxLength(1024)
  featuredImage: string;
}
