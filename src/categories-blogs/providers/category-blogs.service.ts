import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CategoryBlog } from "../category-blogs.entity";
import { CreateCategoryBlogsDto } from "../dto/create-category-blogs.dto";

@Injectable()
export class CategoryBlogsService extends BaseService<CategoryBlog, CreateCategoryBlogsDto> {
  constructor(
    @InjectRepository(CategoryBlog)
    repository: Repository<CategoryBlog>,
    filterData: FilterDataProvider<CategoryBlog>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "categoryblogs").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "categoryblog").execute();
    const result = await this.filters(filter, "categoryblog").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
