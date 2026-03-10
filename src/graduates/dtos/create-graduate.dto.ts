import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { Tab } from "src/tab/tab.entity";
import { User } from "src/users/user.entity";

class GraduateContentItem {
  @IsString()
  description: string;

  @IsNumber()
  language_id: number;
}

export class CreateGraduateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GraduateContentItem)
  content: Array<{ description: string; language_id: number }>;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  type: string;

  @IsArray()
  @Type(() => String)
  courses: string[];

  @IsString()
  @IsOptional()
  courseName?: string;

  @IsString()
  @IsOptional()
  codeCertification?: string;

  @IsString()
  @IsOptional()
  dateCourse?: string;

  @IsString()
  featuredImage: string;

  @IsString()
  attachment: string;

  @IsString()
  imageCertification: string;

  createdBy: User;
  user: User;
  tab: Tab;
}
