import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Service } from "./service.entity";
import { CreateServiceDto } from "./dto/create-service.dto";
import { PatchServiceDto } from "./dto/patch-service.dto";

@Injectable()
export class ServiceHomeService
  extends BaseService<Service, CreateServiceDto, PatchServiceDto>
  implements ICrudService<Service, CreateServiceDto, PatchServiceDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Service)
    repository: Repository<Service>,
  ) {
    super(repository, apiFeaturesService);
  }
}
