import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "../common/filter/dtos/filter.dto";
import { CreateConsultancyDto } from "./dtos/create-consultancy.dto";
import { ConsultancyService } from "./providers/consultancy.service";

@Controller("consultancy")
export class ConsultancyController {
  constructor(private readonly consultancyService: ConsultancyService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.consultancyService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() createConsultancyDto: CreateConsultancyDto) {
    return this.consultancyService.create(createConsultancyDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.consultancyService.delete(id);
  }
}
