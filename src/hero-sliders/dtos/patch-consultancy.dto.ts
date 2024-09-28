import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateHeroSliderDto } from "./create-hero-slider.dto";

export class PatchPostDto extends PartialType(CreateHeroSliderDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
