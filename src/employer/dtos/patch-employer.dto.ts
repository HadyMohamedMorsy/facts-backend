import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { CreateEmployerDto } from "./create-employer.dto";

export class PatchEmployerDto extends PartialType(CreateEmployerDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
