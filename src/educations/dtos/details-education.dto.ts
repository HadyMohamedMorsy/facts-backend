import { IsString } from "class-validator";

export class EducationDetailsDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}
