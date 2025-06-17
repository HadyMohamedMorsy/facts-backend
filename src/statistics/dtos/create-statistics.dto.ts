import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateStatisticsDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title_en: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title_ar: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  value: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  order: number;

  @MaxLength(1024)
  @IsNotEmpty()
  icon: string;
}
