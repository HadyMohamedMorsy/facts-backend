import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateApplicantEducationtDto } from "./dtos/create-applicants-education";
import { ApplicantEducationService } from "./providers/applicants-education.service";

@Controller("applicant-education")
export class ApplicantEducationController {
  constructor(private readonly applicantEducationService: ApplicantEducationService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.applicantEducationService.findAll(filterQueryDto);
  }

  @Post("/store")
  public async create(@Body() createDto: CreateApplicantEducationtDto) {
    return this.applicantEducationService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.applicantEducationService.delete(id);
  }
}
