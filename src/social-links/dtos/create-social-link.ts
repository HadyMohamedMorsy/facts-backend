/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSocialLinkDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(256)
  icon: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  link: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  order: number;
}
