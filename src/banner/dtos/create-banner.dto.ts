import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBannerDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  page: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @MaxLength(1024)
  featuredImage: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  language_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;
}
