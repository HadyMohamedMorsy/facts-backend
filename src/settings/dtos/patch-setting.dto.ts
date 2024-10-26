/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateSettingDto } from "./create-setting.dto";

export class patchSettingDto extends PartialType(CreateSettingDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
