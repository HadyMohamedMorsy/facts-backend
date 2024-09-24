import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateJobDto } from "./dtos/create-job.dto";
import { JobService } from "./providers/job.service";

@Controller("job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.jobService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateJobDto) {
    return this.jobService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.jobService.delete(id);
  }
}
