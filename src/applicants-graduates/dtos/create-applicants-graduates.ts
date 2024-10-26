/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateApplicantGraduatesDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  graduate: number;
}
