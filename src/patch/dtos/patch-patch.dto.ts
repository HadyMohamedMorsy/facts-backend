import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePatchDto } from "./create-patch.dto";

export class PatchPatchDto extends PartialType(CreatePatchDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
