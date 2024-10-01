/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";
export class PatchMagazineDto extends BaseDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
