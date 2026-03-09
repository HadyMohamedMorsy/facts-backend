import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreatePartnerDto } from "./create-partner.dto";

export class PatchPartnerDto extends PartialType(CreatePartnerDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
