import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { User } from "src/users/user.entity";

class TabContentItem {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  title?: string;

  @IsNumber()
  language_id: number;
}

export class CreateTabDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabContentItem)
  content: Array<{ title?: string; language_id: number }>;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug should be lowercase with hyphens only, e.g. "my-tab"',
  })
  @MaxLength(512)
  slug?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  createdBy: User;
}
