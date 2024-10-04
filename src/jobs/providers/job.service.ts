import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/common/base/base.service";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { UserService } from "src/users/providers/user.service";
import { Repository } from "typeorm";
import { CreateJobDto } from "../dtos/create-job.dto";
import { Job } from "../job.entity";

@Injectable()
export class JobService extends BaseService<Job, CreateJobDto> {
  constructor(
    @InjectRepository(Job)
    repository: Repository<Job>,
    filterData: FilterDataProvider<Job>,
    usersService: UserService,
  ) {
    super(repository, filterData, usersService);
  }

  async findBySlug(slug: string) {
    const job = await this.repository.findOne({
      where: { slug },
    });
    if (!job) {
      throw new NotFoundException(`Education with slug '${slug}' not found`);
    }
    return {
      data: job,
    };
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "job").execute();
    return {
      data: entity,
    };
  }

  async findAll(filter: FilterQueryDto) {
    const entity = await this.filters(filter, "job")
      .provideFields([
        "featuredImage",
        "short_description_en",
        "short_description_ar",
        "description_en",
        "description_ar",
      ])
      .execute();
    const result = await this.filters(filter, "job").count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }
}
