/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsInt()
  @IsNotEmpty()
  phone_number: number;

  @IsString()
  @IsOptional()
  message: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;
}
