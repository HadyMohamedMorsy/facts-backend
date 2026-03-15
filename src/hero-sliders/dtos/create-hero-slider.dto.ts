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

  @IsNumber()
  language_id: number;
}

export class CreateHeroSliderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeroSliderContentItem)
  content: Array<{ title?: string; short_description?: string; language_id: number }>;

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
