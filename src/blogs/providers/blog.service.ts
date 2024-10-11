import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { Blog } from "../blog.entity";
import { CreateBlogsDto } from "../dto/create-blogs-blogs.dto";

@Injectable()
export class BlogService extends BaseService<Blog, CreateBlogsDto> {
  constructor(
    @InjectRepository(Blog)
    repository: Repository<Blog>,
    filterData: FilterDataProvider<Blog>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "blog").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "blog")
      .joinRelations("magazines", ["title_ar", "title_en", "id"])
      .provideFields([
        "featuredImage",
        "thumbnail",
        "short_description_en",
        "short_description_ar",
        "meta_description_en",
        "meta_description_ar",
        "description_en",
        "description_ar",
      ])
      .execute();
    const result = await this.filters(filter, "blog").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
