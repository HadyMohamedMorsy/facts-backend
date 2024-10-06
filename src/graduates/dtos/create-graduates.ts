/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateGraduatestDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @ValidateNested({ each: true })
  @Type(() => User)
  user: User;

  @IsString()
  @IsNotEmpty()
  description_en: string;

  @IsString()
  @IsNotEmpty()
  description_ar: string;

  @IsArray()
  @Type(() => String)
  @IsNotEmpty()
  courses: string[];

  @IsString()
  @IsNotEmpty()
  attachment: string;
}
