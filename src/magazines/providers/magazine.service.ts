import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogService } from "src/blogs/providers/blog.service";
import { CategoryService } from "src/categories/providers/category.service";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { FilterDataProvider } from "../../shared/common/filter/providers/filter-data.provider";
import { CreateMagazineDto } from "../dto/create-magazine.dto";
import { Magazine } from "../magazine.entity";

@Injectable()
export class MagazineService extends BaseService<Magazine, CreateMagazineDto> {
  constructor(
    @InjectRepository(Magazine)
    repository: Repository<Magazine>,
    filterData: FilterDataProvider<Magazine>,
    usersService: UserService,
    private readonly blogService: BlogService,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {
    super(repository, filterData, usersService);
  }

  async findBySlug(slug: string) {
    const magazine = await this.repository.findOne({
      where: { slug },
    });
    if (!magazine) {
      throw new NotFoundException(`Education with slug '${slug}' not found`);
    }
    return {
      data: magazine,
    };
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "magazine")
      .searchFrontOnly(filter.search, ["title_en", "title_ar"])
      .joinRelations("created_by", ["firstName", "lastName"])
      .joinRelations("categories", ["name_ar", "name_en", "slug"])
      .joinRelatedEntitiesById("categories", "id", filter?.filters?.categoryId)
      .filterByActive()
      .orderByOrder()
      .execute();
    const result = await this.filtersFront(filter, "magazine").count();
    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "magazine")
      .joinRelations("categories", ["name_en", "name_ar", "id"])
      .provideFields([
        "featuredImage",
        "selectedCategories",
        "short_description_en",
        "short_description_ar",
        "publication_date",
      ])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "magazine").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async deleteMagazineRelations(entity: Magazine): Promise<void> {
    if (!entity) {
      throw new NotFoundException("Magazine not found");
    }

    if (entity.blogs && entity.blogs.length > 0) {
      for (const blog of entity.blogs) {
        await this.blogService.delete(blog.id);
      }
    }
  }
}
