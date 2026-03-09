import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Contact } from "./contact-us.entity";
import { CreateContactDto } from "./dtos/create-contact.dto";
import { PatchContactDto } from "./dtos/patch-contact.dto";

@Injectable()
export class ContactUsService
  extends BaseService<Contact, CreateContactDto, PatchContactDto>
  implements ICrudService<Contact, CreateContactDto, PatchContactDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Contact)
    repository: Repository<Contact>,
  ) {
    super(repository, apiFeaturesService);
  }
}
