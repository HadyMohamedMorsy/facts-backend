import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateStatisticsDto } from "../dtos/create-statistics.dto";
import { PatchStatisticsDto } from "../dtos/patch-statistics.dto";
import { Statistics } from "../statistics.entity";

@Injectable()
export class StatisticsService extends BaseService<
  Statistics,
  CreateStatisticsDto,
  PatchStatisticsDto
> {
  constructor(
    @InjectRepository(Statistics)
    protected readonly repository: Repository<Statistics>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super(repository, apiService);
  }
}
