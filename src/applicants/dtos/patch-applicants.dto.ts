import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateApplicantstDto } from "./create-applicants";

export class PatchApplicantsDto extends PartialType(CreateApplicantstDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
