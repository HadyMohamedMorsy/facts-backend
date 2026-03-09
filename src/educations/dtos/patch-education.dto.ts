import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateEducationDto } from "./create-education.dto";

export class PatchEducationDto extends PartialType(CreateEducationDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
