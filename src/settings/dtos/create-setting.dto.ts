/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateSettingDto {
  @IsInt()
  @IsNotEmpty()
  parent_id: number;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  short_description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  icon: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImage: string;

  @IsInt()
  language_id: number;
}
