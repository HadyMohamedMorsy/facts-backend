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
import { User } from "src/users/user.entity";

class PartnerContentItem {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  language_id: number;
}

export class CreatePartnerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartnerContentItem)
  content: Array<{ title?: string; description?: string; language_id: number }>;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  link: string;

  @IsString()
  featuredImage: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
