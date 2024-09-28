import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateGallarysDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title: string;

  @IsArray()
  @MaxLength(1024)
  files: string[];
}
