import { Type } from "class-transformer";
import { IsArray, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Gender } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class CreateProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(256)
  lastName: string;

  @IsString()
  @MaxLength(3)
  age: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  country?: string;

  @IsString()
  @MaxLength(12)
  phoneNumber: string;

  @IsString()
  @MaxLength(12)
  experience: string;

  @IsArray()
  @Type(() => String)
  skills: string[];

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  achievements?: string;

  @IsOptional()
  @IsString()
  attachment?: string;

  createdBy: User;
}
