import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateProfiletDto } from "./create-profile";

export class PatchProfileDto extends PartialType(CreateProfiletDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
