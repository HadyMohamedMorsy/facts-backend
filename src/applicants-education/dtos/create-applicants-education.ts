/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateApplicantEducationtDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  education: number;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
