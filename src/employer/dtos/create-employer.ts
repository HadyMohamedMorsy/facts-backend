/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmployertDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  created_by: number;

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  business_type: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  company_address: string;

  @IsString()
  @IsNotEmpty()
  company_phone: string;

  @IsString()
  @IsNotEmpty()
  company_email: string;

  @IsString()
  @IsOptional()
  website_url: string;
}
