import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreatePatchDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name_ar: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  year: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsString()
  description_ar?: string;

  @IsArray()
  @IsString({ each: true })
  files: string[];
}
