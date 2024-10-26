import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class createMagazineBlogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  label: string;

  @IsString()
  value: string;
}
