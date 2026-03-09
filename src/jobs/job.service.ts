import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Job } from "./job.entity";
import { CreateJobDto } from "./dtos/create-job.dto";
import { PatchJobDto } from "./dtos/patch-job.dto";

@Injectable()
export class JobService
  extends BaseService<Job, CreateJobDto, PatchJobDto>
  implements ICrudService<Job, CreateJobDto, PatchJobDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Job)
    repository: Repository<Job>,
  ) {
    super(repository, apiFeaturesService);
  }
}
