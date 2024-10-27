import { Injectable, NotFoundException } from "@nestjs/common";
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
    const entity = await this.filtersFront(filter, "blog")
      .filterByActive()
      .orderByOrder()
      .execute();
    return {
      data: entity,
    };
  }

  async findBySlug(slug: string) {
    const blog = await this.repository.findOne({
      where: { slug },
      relations: ["created_by"],
    });

    if (!blog) {
      throw new NotFoundException(`Blog with slug '${slug}' not found`);
    }

    return {
      data: blog,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "blog")
      .joinRelations("magazine", ["title_ar", "title_en", "id"])
      .provideFields([
        "featuredImage",
        "thumbnail",
        "short_description_en",
        "short_description_ar",
        "meta_description_en",
        "selectMagazine",
        "meta_title_en",
        "meta_title_ar",
        "meta_description_en",
        "meta_description_ar",
        "description_en",
        "description_ar",
      ])
      .orderByOrder()
      .execute();
    const result = await this.filters(filter, "blog").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async findBySlugWithPaginatedBlogs(magazine: any, filter: FilterQueryDto) {
    const { start, length } = filter;
    const [blogs, totalBlogs] = await this.repository
      .createQueryBuilder("blog")
      .where("blog.magazineId = :magazineId", { magazineId: magazine.id })
      .skip(start)
      .take(length)
      .getManyAndCount();
    console.log(blogs);

    return {
      data: blogs,
      recordsFiltered: blogs.length,
      totalRecords: +totalBlogs,
    };
  }
}
