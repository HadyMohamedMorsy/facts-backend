import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { Contact } from "../consultancy.entity";

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactUsRepository: Repository<Contact>,
    private readonly filterData: FilterDataProvider<Contact>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const contactUs = await this.filterData
      .initRepositry("contact", this.contactUsRepository, filter)
      .filter()
      .provideFields()
      .sort()
      .paginate()
      .search()
      .execute();
    return contactUs;
  }

  public async delete(id: number) {
    await this.contactUsRepository.delete(id);
    return { deleted: true, id };
  }
}
