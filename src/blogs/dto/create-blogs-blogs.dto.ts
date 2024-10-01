/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreateCategoryBlogsDto extends BaseDto {
  @IsString()
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

  @IsString()
  short_description: string;

  @IsString()
  meta_description: string;

  @IsBoolean()
  is_featured: boolean;

  @IsString()
  description: string;
}
