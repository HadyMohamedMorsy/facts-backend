import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateConsultancyDto } from "./create-consultancy.dto";

export class PatchConsultancyDto extends PartialType(CreateConsultancyDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
