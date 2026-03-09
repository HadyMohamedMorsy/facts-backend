import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateTabDto } from "./create-tab.dto";

export class PatchTabDto extends PartialType(CreateTabDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
