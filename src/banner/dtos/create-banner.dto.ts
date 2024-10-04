import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateBannerDto extends BaseDto {
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  page: string;

  @IsOptional()
  @IsString()
  short_description_en?: string;

  @IsOptional()
  @IsString()
  short_description_ar?: string;

  @IsString()
  featuredImage: string;
}
