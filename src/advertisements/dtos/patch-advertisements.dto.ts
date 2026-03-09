import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatAdvertisementDto } from "./create-advertisements.dto";

export class PatchAdvertisementDto extends PartialType(CreatAdvertisementDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
