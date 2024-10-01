import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateJobDto } from "./dtos/create-job.dto";
import { JobService } from "./providers/job.service";

@Controller("job")
export class JobController extends BaseController<CreateJobDto> {
  constructor(
    private readonly jobService: JobService,
    private readonly TransformRequest: TransformRequest,
  ) {
    super(jobService, TransformRequest);
  }
}
