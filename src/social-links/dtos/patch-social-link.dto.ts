import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateSocialLinkDto } from "./create-social-link";

export class PatchSocialLinkDto extends PartialType(CreateSocialLinkDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
