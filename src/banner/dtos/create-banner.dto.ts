import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class BannerContentItem {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsNumber()
  language_id: number;
}

export class CreateBannerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BannerContentItem)
  content: Array<{ title: string; short_description?: string; language_id: number }>;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  page: string;

  @IsString()
  featuredImage: string;
}
