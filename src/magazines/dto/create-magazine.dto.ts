import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Category } from "src/categories/category.entity";
import { User } from "src/users/user.entity";

class MagazineContentItem {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  short_description?: string;

  @IsNumber()
  language_id: number;
}

export class CreateMagazineDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MagazineContentItem)
  content: Array<{ title?: string; short_description?: string; language_id: number }>;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  featuredImage: string;

  @IsOptional()
  @IsDateString()
  publicationDate?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
  categories: Category[];
}
