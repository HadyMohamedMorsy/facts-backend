import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateSubscribeDto } from "./create-subscribe";

export class PatchSubscribeDto extends PartialType(CreateSubscribeDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
