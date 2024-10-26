import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateApplicantGraduatesDto } from "./dtos/create-applicants-graduates";
import { ApplicantGraduatesService } from "./providers/applicants-graduates.service";

@Controller("applicant-graduates")
export class ApplicantGraduatesController {
  constructor(private readonly applicantGraduatesService: ApplicantGraduatesService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.applicantGraduatesService.findAll(filterQueryDto);
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() createDto: CreateApplicantGraduatesDto) {
    return this.applicantGraduatesService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.applicantGraduatesService.delete(id);
  }
}
