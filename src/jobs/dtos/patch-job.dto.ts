import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateJobDto } from "./create-job.dto";

export class PatchJobDto extends PartialType(CreateJobDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
