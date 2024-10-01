import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateCategoryBlogsDto } from "./create-category-blogs.dto";

export class PatchCategoryBlogsDto extends PartialType(CreateCategoryBlogsDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
