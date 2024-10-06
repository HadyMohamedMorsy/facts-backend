import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateGraduatestDto } from "./create-graduates";

export class PatchGraduatesDto extends PartialType(CreateGraduatestDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
