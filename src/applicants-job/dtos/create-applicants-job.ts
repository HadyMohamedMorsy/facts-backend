/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateApplicantJobstDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  jon_id: number;

  @IsString()
  @IsNotEmpty()
  attachment: string;
}
