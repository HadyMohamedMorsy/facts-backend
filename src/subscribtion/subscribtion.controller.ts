import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateSubscribeDto } from "./dtos/create-subscribe";
import { SubscribtionService } from "./providers/subscribtion.service";
@Controller("subscribtion")
export class SubscribtionController {
  constructor(private readonly subscribtionService: SubscribtionService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.subscribtionService.findAll(filterQueryDto);
  }

  @Post("/store")
  public async create(@Body() createDto: CreateSubscribeDto) {
    return this.subscribtionService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.subscribtionService.delete(id);
  }
}
