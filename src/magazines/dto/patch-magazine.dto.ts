/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateMagazineDto } from "./create-magazine.dto";
export class PatchMagazineDto extends PartialType(CreateMagazineDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
