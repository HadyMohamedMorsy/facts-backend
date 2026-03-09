import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Education } from "src/educations/education.entity";

export class CreateApplicantEducationDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  createdBy: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  education: Education;
}
