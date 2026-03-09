import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

class ConsultancyContentItem {
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

class AccordionContentItem {
  @IsString()
  @MaxLength(256)
  accordion_title: string;

  @IsString()
  @MaxLength(1024)
  description: string;

  @IsNumber()
  language_id: number;
}

class ConsultancyAccordionItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccordionContentItem)
  content: Array<{ accordion_title: string; description: string; language_id: number }>;
}

export class CreateConsultancyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsultancyContentItem)
  content: Array<{ title: string; short_description?: string; language_id: number }>;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  featuredImage: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsultancyAccordionItemDto)
  consultancy_accordion: Array<{
    content: Array<{ accordion_title: string; description: string; language_id: number }>;
  }>;
}
