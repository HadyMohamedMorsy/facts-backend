import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Employer } from "./employer.entity";
import { CreateEmployerDto } from "./dtos/create-employer.dto";
import { PatchEmployerDto } from "./dtos/patch-employer.dto";

@Injectable()
export class EmployerService
  extends BaseService<Employer, CreateEmployerDto, PatchEmployerDto>
  implements ICrudService<Employer, CreateEmployerDto, PatchEmployerDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Employer)
    repository: Repository<Employer>,
  ) {
    super(repository, apiFeaturesService);
  }
}
