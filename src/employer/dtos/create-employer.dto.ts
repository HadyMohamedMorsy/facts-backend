import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateEmployerDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  businessType: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  @IsString()
  @IsNotEmpty()
  companyPhone: string;

  @IsString()
  @IsNotEmpty()
  companyEmail: string;

  @IsString()
  @IsOptional()
  websiteUrl?: string;

  createdBy: User;
}
