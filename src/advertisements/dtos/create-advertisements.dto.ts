import { IsString } from "class-validator";
import { BaseDto } from "src/shared/common/base/base.dto";

export class CreatAdvertisementDto extends BaseDto {
  @IsString()
  company_name_en: string;

  @IsString()
  company_name_ar: string;

  @IsString()
  featuredImage: string;
}
