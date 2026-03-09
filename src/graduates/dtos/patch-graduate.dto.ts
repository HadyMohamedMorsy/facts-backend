import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateGraduateDto } from "./create-graduate.dto";

export class PatchGraduateDto extends PartialType(CreateGraduateDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
