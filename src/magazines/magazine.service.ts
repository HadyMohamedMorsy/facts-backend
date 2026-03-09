import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Blog } from "src/blogs/blog.entity";
import { Magazine } from "./magazine.entity";
import { CreateMagazineDto } from "./dto/create-magazine.dto";
import { PatchMagazineDto } from "./dto/patch-magazine.dto";
import { BlogsService } from "src/blogs/blog.service";

@Injectable()
export class MagazineService
  extends BaseService<Magazine, CreateMagazineDto, PatchMagazineDto>
  implements ICrudService<Magazine, CreateMagazineDto, PatchMagazineDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Magazine)
    repository: Repository<Magazine>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly blogService: BlogsService,
  ) {
    super(repository, apiFeaturesService);
  }

  async findBySlug(slug: string) {
    const magazine = await this.repository.findOne({
      where: { slug },
      relations: ["categories"],
    });
    if (!magazine) {
      throw new NotFoundException(`Magazine with slug '${slug}' not found`);
    }
    return { data: magazine };
  }

  override async delete(id: number) {
    const magazine = await this.repository.findOne({
      where: { id },
      relations: ["blogs"],
    });
    if (magazine?.blogs && magazine.blogs.length > 0) {
      for (const blog of magazine.blogs) {
        await this.blogService.delete(blog.id);
      }
    }
    return super.delete(id);
  }

  async findBySlugWithPaginatedBlogs(filter: {
    filters?: { slug?: string };
    length?: number;
    start?: number;
  }) {
    const slug = filter.filters?.slug;
    if (!slug) {
      throw new BadRequestException("Missing slug in filters");
    }
    const magazine = await this.repository.findOne({ where: { slug } });
    if (!magazine) {
      throw new NotFoundException(`Magazine with slug '${slug}' not found`);
    }
    const length = Math.min(Math.max(+(filter.length ?? 10), 1), 100);
    const start = Math.max(+(filter.start ?? 0), 0);
    const [data, totalRecords] = await this.blogRepository
      .createQueryBuilder("e")
      .where("e.magazineId = :magazineId", { magazineId: magazine.id })
      .leftJoin("e.categories", "categories")
      .addSelect(["categories.id", "categories.content", "categories.slug"])
      .leftJoin("e.createdBy", "createdBy")
      .addSelect(["createdBy.id", "createdBy.firstName", "createdBy.lastName"])
      .orderBy("e.createdAt", "DESC")
      .skip(start)
      .take(length)
      .getManyAndCount();
    return {
      data,
      recordsFiltered: data.length,
      totalRecords,
    };
  }
}
