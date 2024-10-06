import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateApplicantEducationtDto } from "./create-applicants-education";

export class PatchApplicantEducationDto extends PartialType(CreateApplicantEducationtDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
