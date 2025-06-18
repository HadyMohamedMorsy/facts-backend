import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreatePartnersDto } from "../dtos/create-partners.dto";
import { PatchPartnerDto } from "../dtos/patch-partners.dto";
import { Partner } from "../partner.entity";

@Injectable()
export class PartnersService extends BaseService<Partner, CreatePartnersDto, PatchPartnerDto> {
  constructor(
    @InjectRepository(Partner)
    repository: Repository<Partner>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
