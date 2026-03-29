import { Type } from "class-transformer";
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { User } from "src/users/user.entity";

class HeroSliderContentItem {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  kicker?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  eyebrow?: string;

  @IsOptional()
  @IsString()
  @MaxLength(512)
  accent?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  standards?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  cta_label?: string;

  /** Route path without locale prefix, e.g. /educations */
  @IsOptional()
  @IsString()
  @MaxLength(512)
  cta_link?: string;

  @IsNumber()
  language_id: number;
}

export class CreateHeroSliderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeroSliderContentItem)
  content: HeroSliderContentItem[];

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  @IsIn(["image", "video"])
  type?: "image" | "video";

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
