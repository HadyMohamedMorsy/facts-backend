/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreatePartnersDto extends BaseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @MaxLength(1024)
  featuredImage: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
