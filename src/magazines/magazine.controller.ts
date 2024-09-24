import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateMagazineDto } from "./dto/create-magazine.dto";
import { MagazineService } from "./providers/magazine.service";

@Controller("magazine")
export class GallaryController {
  constructor(private readonly magazineService: MagazineService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.magazineService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateMagazineDto) {
    return this.magazineService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.magazineService.delete(id);
  }
}
