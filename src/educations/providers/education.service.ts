import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateEducationsDto } from "../dtos/create-educations.dto";
import { Education } from "../education.entity";

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly repository: Repository<Education>,
    private readonly filterData: FilterDataProvider<Education>,
  ) {}

  public async create(createEducationDto: CreateEducationsDto) {
    const education = this.repository.create({ ...createEducationDto });
    return await this.repository.save(education);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("education", this.repository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .joinRelations(["educationAccordion"])
      .execute();
    return entity;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
