/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfiletDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsArray()
  @Type(() => String)
  @IsNotEmpty()
  skills: string[];

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  achievements?: string;

  @IsString()
  @IsOptional()
  attachment: string;
}
