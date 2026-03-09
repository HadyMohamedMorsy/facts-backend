import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateApplicantEducationDto } from "./create-applicant-education.dto";

export class PatchApplicantEducationDto extends PartialType(CreateApplicantEducationDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
