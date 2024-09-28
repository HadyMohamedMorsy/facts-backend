import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateStatisticsDto extends BaseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsInt()
  @IsNotEmpty()
  @MaxLength(256)
  value: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  icon: string;
}
