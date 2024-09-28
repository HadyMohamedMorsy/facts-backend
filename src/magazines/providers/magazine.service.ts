import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilterQueryDto } from "../../shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "../../shared/common/filter/providers/filter-data.provider";
import { CreateMagazineDto } from "../dto/create-magazine.dto";
import { Magazine } from "../magazine.entity";

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private readonly repository: Repository<Magazine>,
    private readonly filterData: FilterDataProvider<Magazine>,
  ) {}

  public async create(create: CreateMagazineDto) {
    const data = this.repository.create(create);
    return await this.repository.save(data);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("magazine", this.repository, filter)
      .filter()
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
