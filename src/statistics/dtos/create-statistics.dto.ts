import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { User } from "src/users/user.entity";

class StatisticsContentItem {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title?: string;

  @IsNumber()
  language_id: number;
}

export class CreateStatisticsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatisticsContentItem)
  content: Array<{ title?: string; language_id: number }>;

  @IsInt()
  @Type(() => Number)
  value: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
