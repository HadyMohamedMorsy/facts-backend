import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class EducationAccordion {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
