import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateServiceDto } from "./service.dto";

export class PatchServiceDto extends PartialType(CreateServiceDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
