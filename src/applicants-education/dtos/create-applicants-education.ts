/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateApplicantEducationtDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  education_id: number;
  
  @IsBoolean()
  is_active: boolean;

  @IsString()
  @IsNotEmpty()
  attachment: string;
}
