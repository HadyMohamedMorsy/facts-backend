import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateApplicantstDto } from "./dtos/create-applicants";
import { ApplicantsService } from "./providers/applicants.service";
@Controller("applicants")
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.applicantsService.findAll(filterQueryDto);
  }

  @Post("/store")
  public async create(@Body() createDto: CreateApplicantstDto) {
    return this.applicantsService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.applicantsService.delete(id);
  }
}
