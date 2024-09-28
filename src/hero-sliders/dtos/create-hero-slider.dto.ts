import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateHeroSliderDto extends BaseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @MaxLength(1024)
  featuredImage: string;
}
