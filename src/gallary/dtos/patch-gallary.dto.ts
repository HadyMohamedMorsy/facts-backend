import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateGallarysDto } from "./create-gallary.dto";

export class PatchConsultancyDto extends PartialType(CreateGallarysDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
