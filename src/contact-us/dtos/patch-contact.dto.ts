import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateContactDto } from "./create-contact.dto";

export class PatchContactDto extends PartialType(CreateContactDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
