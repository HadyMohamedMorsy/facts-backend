import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";

class TestimonialContentItem {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  position?: string;

  @IsOptional()
  @IsString()
  quote?: string;

  @IsNumber()
  language_id: number;
}

export class CreateTestimonialDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestimonialContentItem)
  content: Array<{ name?: string; position?: string; quote?: string; language_id: number }>;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  featuredImage?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;
}
