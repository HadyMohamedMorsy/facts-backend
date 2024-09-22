import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateGallarysDto } from "../dtos/create-gallary.dto";
import { Gallary } from "../gallary.entity";

@Injectable()
export class GallaryService {
  constructor(
    @InjectRepository(Gallary)
    private readonly repository: Repository<Gallary>,
    private readonly filterData: FilterDataProvider<Gallary>,
  ) {}

  public async create(create: CreateGallarysDto) {
    const education = this.repository.create({ ...create });
    return await this.repository.save(education);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("gallary", this.repository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .execute();
    return entity;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
