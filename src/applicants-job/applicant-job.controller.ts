import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateApplicantJobstDto } from "./dtos/create-applicants-job";
import { ApplicantJobsService } from "./providers/applicants-job.service";

@Controller("applicant-Job")
export class ApplicantJobController {
  constructor(private readonly applicantJobsService: ApplicantJobsService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.applicantJobsService.findAll(filterQueryDto);
  }

  @Post("/store")
  public async create(@Body() createDto: CreateApplicantJobstDto) {
    return this.applicantJobsService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.applicantJobsService.delete(id);
  }
}
