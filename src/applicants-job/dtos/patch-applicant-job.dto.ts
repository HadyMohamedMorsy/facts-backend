import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateApplicantJobDto } from "./create-applicant-job.dto";

export class PatchApplicantJobDto extends PartialType(CreateApplicantJobDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
