/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateJobDto extends BaseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  @MaxLength(512)
  slug: string;

  @IsNotEmpty()
  @IsString()
  short_description: string;

  @IsNotEmpty()
  @MaxLength(1024)
  featuredImage: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString()
  skills?: string[];
}
