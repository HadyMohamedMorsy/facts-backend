import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class createMagazineBlogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  label: string;

  @IsNumber()
  @Type(() => Number)
  value: number;
}
