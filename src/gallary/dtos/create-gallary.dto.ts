import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";

class GallaryContentItem {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  accordion_title?: string;

  @IsNumber()
  language_id: number;
}

export class CreateGallaryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  tabId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GallaryContentItem)
  content: Array<{ accordion_title?: string; language_id: number }>;

  @IsArray()
  @IsString({ each: true })
  files: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy?: any;
  tab?: any;
}
