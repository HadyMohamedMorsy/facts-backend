import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class EducationAccordion {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description: string;
}
