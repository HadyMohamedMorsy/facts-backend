import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { Blog } from "../blog.entity";
import { CreateBlogsDto } from "../dto/create-blogs-blogs.dto";
import { PatchBlogDto } from "../dto/patch-blog.dto";

@Injectable()
export class BlogService extends BaseService<Blog, CreateBlogsDto, PatchBlogDto> {
  constructor(
    @InjectRepository(Blog)
    repository: Repository<Blog>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
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
}
