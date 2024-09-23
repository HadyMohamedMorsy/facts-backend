import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreatePartnersDto } from "./dtos/create-partners.dto";
import { PartnersService } from "./providers/partners.service";

@Controller()
export class PartnersController {
  constructor(private readonly partnerService: PartnersService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.partnerService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreatePartnersDto) {
    return this.partnerService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.partnerService.delete(id);
  }
}
