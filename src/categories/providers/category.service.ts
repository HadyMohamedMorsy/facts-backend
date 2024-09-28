import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LanguageService } from "src/languages/providers/language.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { Category } from "../category.entity";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto> {
  constructor(
    @InjectRepository(Category)
    repository: Repository<Category>,
    filterData: FilterDataProvider<Category>,
    usersService: UserService,
    languageService: LanguageService,
  ) {
    super(repository, filterData, usersService, languageService);
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "category").execute();
    const result = await this.filters(filter, "category").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
