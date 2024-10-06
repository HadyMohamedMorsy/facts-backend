import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateApplicantGraduatesDto } from "./create-applicants-graduates";

export class PatchApplicantGraduatesDto extends PartialType(CreateApplicantGraduatesDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
