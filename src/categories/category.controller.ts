import { Body, Controller, Delete, HttpCode, Post, Req, UseInterceptors } from "@nestjs/common";
import { NoFilesInterceptor } from "@nestjs/platform-express";
import { BaseController } from "src/shared/common/base/base.controller";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryService } from "./providers/category.service";
import { Request } from "express";

@Controller("category")
export class CategoryController extends BaseController<CreateCategoryDto> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(categoryService, TransformRequest);
  }

  @Post("autocomplete/index")
  @HttpCode(200)
  public autoComplete(@Body() filterQueryDto: FilterQueryDto) {
    return this.categoryService.autoComplete(filterQueryDto);
  }

  @Delete("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public async delete(@Body() body: { id: string }, @Req() request: Request) {
    const entity = await this.categoryService.findOne(+body.id, ["magazines"]);
    await this.categoryService.deleteCategoriesRelations(entity);
    return await super.delete(body, request);
  }
}
