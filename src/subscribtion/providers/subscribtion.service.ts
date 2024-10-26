import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateSubscribeDto } from "../dtos/create-subscribe";
import { Subscribe } from "../subscribtion.entity";

@Injectable()
export class SubscribtionService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly repository: Repository<Subscribe>,
    private readonly filterData: FilterDataProvider<Subscribe>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("subscribe", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .joinRelations("created_by", ["email"])
      .search()
      .execute();

    const result = await this.filterData
      .initRepositry("subscribe", this.repository, filter)
      .count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async create(createDto: CreateSubscribeDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
