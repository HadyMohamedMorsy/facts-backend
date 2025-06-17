import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { PatchServiceDto } from "../dto/patch-service.dto";
import { CreateServiceDto } from "../dto/service.dto";
import { Service } from "../service.entity";

@Injectable()
export class ServiceService extends BaseService<Service, CreateServiceDto, PatchServiceDto> {
  constructor(
    @InjectRepository(Service)
    protected readonly repository: Repository<Service>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
