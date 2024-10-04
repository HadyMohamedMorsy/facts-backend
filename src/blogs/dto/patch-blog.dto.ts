import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateBlogsDto } from "./create-blogs-blogs.dto";

export class PatchBlogDto extends PartialType(CreateBlogsDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
