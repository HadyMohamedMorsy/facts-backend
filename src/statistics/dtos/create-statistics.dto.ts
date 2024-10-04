import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateStatisticsDto extends BaseDto {
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

  @MaxLength(1024)
  @IsNotEmpty()
  icon: string;
}
