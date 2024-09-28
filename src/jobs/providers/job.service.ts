import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateJobDto } from "../dtos/create-job.dto";
import { Job } from "../job.entity";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly repository: Repository<Job>,
    private readonly filterData: FilterDataProvider<Job>,
  ) {}

  public async create(create: CreateJobDto) {
    const data = this.repository.create(create);
    return await this.repository.save(data);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("consultancy", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .execute();
    return {
      data: entity,
      recordsFiltered: entity.length,
    };
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
