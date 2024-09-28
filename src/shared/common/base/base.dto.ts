import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class BaseDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  order: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  language_id: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;
}
