import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { Contact } from "../contact-us.entity";
import { CreateContactDto } from "../dtos/create-contact";

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(Contact)
    private readonly repository: Repository<Contact>,
    private readonly filterData: FilterDataProvider<Contact>,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const contactUs = await this.filterData
      .initRepositry("contact", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .execute();
    return contactUs;
  }

  async create(createDto: CreateContactDto) {
    const entity = this.repository.create(createDto as any);
    return this.repository.save(entity);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
