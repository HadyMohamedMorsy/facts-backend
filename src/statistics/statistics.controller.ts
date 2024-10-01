import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateStatisticsDto } from "./dtos/create-statistics.dto";
import { StatisticsService } from "./providers/statistics.service";

@Controller("statistics")
export class StatisticsController extends BaseController<CreateStatisticsDto> {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(statisticsService, TransformRequest);
    this.duplicatedPropertirs = ["order"];
  }
}
