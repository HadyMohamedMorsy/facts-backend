import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateBannerDto } from "./create-banner.dto";

export class PatchBannerDto extends PartialType(CreateBannerDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
