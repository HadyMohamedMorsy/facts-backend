import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateEducationsDto } from "../dtos/create-educations.dto";
import { Education } from "../education.entity";

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    private readonly filterData: FilterDataProvider<Education>,
  ) {}

  public async create(createEducationDto: CreateEducationsDto) {
    const education = this.educationRepository.create({ ...createEducationDto });
    return await this.educationRepository.save(education);
  }

  public async findAll(filter: FilterQueryDto) {
    const education = await this.filterData
      .initRepositry("education", this.educationRepository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .joinRelations(["educationAccordion"])
      .execute();
    return education;
  }

  public async delete(id: number) {
    await this.educationRepository.delete(id);
    return { deleted: true, id };
  }
}
