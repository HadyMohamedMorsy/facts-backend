import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateTeamDto } from "./create-team.dto";

export class PatchTeamDto extends PartialType(CreateTeamDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
