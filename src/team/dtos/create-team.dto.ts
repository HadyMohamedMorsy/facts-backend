import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class TeamContentItem {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  position?: string;

  @IsNumber()
  language_id: number;
}

class TeamSocialItemDto {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  icon: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  link: string;
}

export class CreateTeamDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamContentItem)
  content: Array<{ name?: string; description?: string; position?: string; language_id: number }>;

  @IsArray()
  @IsString({ each: true })
  phoneNumber: string[];

  @IsString()
  @MaxLength(1024)
  featuredImage: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamSocialItemDto)
  socialLinks?: Array<{ icon: string; link: string }>;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;
}
