import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePartnersDto } from "./create-partners.dto";

export class PatchPartnerDto extends PartialType(CreatePartnersDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
