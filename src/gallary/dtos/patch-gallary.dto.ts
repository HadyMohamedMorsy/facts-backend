import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateGallaryDto } from "./create-gallary.dto";

export class PatchGallaryDto extends PartialType(CreateGallaryDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
