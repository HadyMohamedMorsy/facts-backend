import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class EducationDetailDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  accordion_title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description: string;
}
