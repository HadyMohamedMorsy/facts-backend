import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreatePartnersDto } from "../dtos/create-partners.dto";
import { Partner } from "../partner.entity";

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly repository: Repository<Partner>,
    private readonly filterData: FilterDataProvider<Partner>,
  ) {}

  public async create(create: CreatePartnersDto) {
    const education = this.repository.create({ ...create });
    return await this.repository.save(education);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("partner", this.repository, filter)
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
