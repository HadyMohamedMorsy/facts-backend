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

class ServiceContentItem {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name?: string;

  @IsNumber()
  language_id: number;
}

export class CreateServiceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceContentItem)
  content: Array<{ name?: string; language_id: number }>;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  link?: string;

  @IsString()
  featuredImage: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
