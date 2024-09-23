import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateEducationsDto } from "./dtos/create-educations.dto";
import { EducationService } from "./providers/education.service";

@Controller("education")
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.educationService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() createEducationsDto: CreateEducationsDto) {
    return this.educationService.create(createEducationsDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.educationService.delete(id);
  }
}
