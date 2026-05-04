import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateTestimonialDto } from "./create-testimonial.dto";

export class PatchTestimonialDto extends PartialType(CreateTestimonialDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
