import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateSocialLinkDto {
  @IsString()
  @MinLength(3)
  @MaxLength(1024)
  icon: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1024)
  link: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  orderIndex?: number;

  createdBy: User;
}
