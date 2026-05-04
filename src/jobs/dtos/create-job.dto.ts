import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { LOCATION, TYPE } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

class JobContentItem {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description?: string;

  @IsNumber()
  language_id: number;
}

export class CreateJobDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JobContentItem)
  content: Array<{
    title?: string;
    short_description?: string;
    description?: string;
    language_id: number;
  }>;

  @IsEnum(TYPE, { message: "Type must be either parttime or fulltime" })
  type: TYPE;

  @IsOptional()
  @IsEnum(LOCATION, { message: "Location must be either cairo or giza" })
  location?: LOCATION;

  @IsNumber()
  @Type(() => Number)
  salary: number;

  @IsString()
  @MaxLength(1024)
  featuredImage: string;

  createdBy: User;
}
