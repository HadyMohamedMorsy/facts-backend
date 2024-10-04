import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateEmployertDto } from "./create-employer";

export class PatchEmployerDto extends PartialType(CreateEmployertDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
