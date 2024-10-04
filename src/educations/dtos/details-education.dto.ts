import { IsString } from "class-validator";

export class EducationDetailsDto {
  @IsString()
  name_en: string;

  @IsString()
  name_ar: string;

  @IsString()
  value_en: string;

  @IsString()
  value_ar: string;
}
