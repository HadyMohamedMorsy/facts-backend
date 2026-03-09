import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class AdvertisementContentItem {
  @IsString()
  company_name: string;

  @IsNumber()
  language_id: number;
}

export class CreatAdvertisementDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdvertisementContentItem)
  content: Array<{ company_name: string; language_id: number }>;

  @IsString()
  page: string;

  @IsString()
  featuredImage: string;
}
