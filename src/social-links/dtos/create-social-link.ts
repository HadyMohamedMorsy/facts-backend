/* eslint-disable prettier/prettier */
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateSocialLinkDto extends BaseDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(256)
  icon: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  link: string;
}
