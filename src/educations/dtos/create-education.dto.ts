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

class EducationContentItem {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @IsOptional()
  @IsString()
  intro_description?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsNumber()
  language_id: number;
}

class AccordionContentItem {
  @IsString()
  @MaxLength(512)
  accordion_title: string;

  @IsString()
  description: string;

  @IsNumber()
  language_id: number;
}

class DetailsContentItem {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsNumber()
  language_id: number;
}

class TopicContentItem {
  @IsString()
  @MaxLength(256)
  topic_title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  language_id: number;
}

class EducationAccordionItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccordionContentItem)
  content: Array<{ accordion_title: string; description: string; language_id: number }>;
}

class EducationDetailsItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentItem)
  content: Array<{ name: string; value: string; language_id: number }>;
}

class EducationTopicItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicContentItem)
  content: Array<{ topic_title: string; description?: string; language_id: number }>;
}

export class CreateEducationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationContentItem)
  content: Array<{
    title: string;
    intro_description?: string;
    short_description?: string;
    language_id: number;
  }>;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  featuredImage: string;

  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  courseFile?: string;

  @IsOptional()
  @IsString()
  advisorContactLink?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationTopicItemDto)
  education_topics?: Array<{
    content: Array<{ topic_title: string; description?: string; language_id: number }>;
  }>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationAccordionItemDto)
  education_accordion: Array<{
    content: Array<{ accordion_title: string; description: string; language_id: number }>;
  }>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDetailsItemDto)
  education_details: Array<{
    content: Array<{ name: string; value: string; language_id: number }>;
  }>;
}
