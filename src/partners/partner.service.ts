import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Partner } from "./partner.entity";
import { CreatePartnerDto } from "./dtos/create-partner.dto";
import { PatchPartnerDto } from "./dtos/patch-partner.dto";

@Injectable()
export class PartnerService
  extends BaseService<Partner, CreatePartnerDto, PatchPartnerDto>
  implements ICrudService<Partner, CreatePartnerDto, PatchPartnerDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Partner)
    repository: Repository<Partner>,
  ) {
    super(repository, apiFeaturesService);
  }
}
