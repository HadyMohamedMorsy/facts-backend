import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class ConsultancyAccordienDto {
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
  @MaxLength(1024)
  description_en: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description_ar: string;
}
