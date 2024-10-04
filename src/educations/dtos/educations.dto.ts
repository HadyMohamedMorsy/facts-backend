import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class EducationAccordion {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title_ar: string;

  @IsString()
  @IsNotEmpty()
  description_en: string;

  @IsString()
  @IsNotEmpty()
  description_ar: string;
}
