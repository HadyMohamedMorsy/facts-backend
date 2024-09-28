/* eslint-disable prettier/prettier */
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SoicalLinkDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(256)
  icon: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(256)
  link: string;
}
