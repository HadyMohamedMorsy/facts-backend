import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { Graduates } from "src/graduates/graduates.entity";

export class CreateApplicantGraduatesDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  createdBy: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  graduate: Graduates;
}
