import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryService } from "./providers/category.service";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.categoryService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateCategoryDto) {
    return this.categoryService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.categoryService.delete(id);
  }
}
