/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateCategoryDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;
}
