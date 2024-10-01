import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateStatisticsDto } from "./create-statistics.dto";

export class PatchStatisticsDto extends PartialType(CreateStatisticsDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
