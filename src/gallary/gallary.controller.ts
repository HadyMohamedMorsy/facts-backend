import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateGallarysDto } from "./dtos/create-gallary.dto";
import { GallaryService } from "./providers/gallary.service";

@Controller("gallary")
export class GallaryController {
  constructor(private readonly gallaryService: GallaryService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.gallaryService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateGallarysDto) {
    return this.gallaryService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.gallaryService.delete(id);
  }
}
