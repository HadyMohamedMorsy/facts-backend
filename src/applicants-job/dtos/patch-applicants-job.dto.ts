import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateApplicantJobstDto } from "./create-applicants-job";

export class PatchApplicantJobsDto extends PartialType(CreateApplicantJobstDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
