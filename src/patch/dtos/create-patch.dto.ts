import { Type } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { User } from "src/users/user.entity";

class PatchContentItem {
  @IsOptional()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  language_id: number;
}

export class CreatePatchDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PatchContentItem)
  content: Array<{ name?: string; description?: string; language_id: number }>;

  @IsString()
  @MaxLength(5)
  year: string;

  @IsArray()
  @IsString({ each: true })
  files: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
