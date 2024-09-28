import { IsString, MaxLength } from "class-validator";

export class EducationDetailsDto {
  @IsString()
  @MaxLength(1024)
  name: string;

  @IsString()
  @MaxLength(1024)
  value: string;
}
