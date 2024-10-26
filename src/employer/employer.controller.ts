import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateEmployertDto } from "./dtos/create-employer";
import { EmployerService } from "./providers/employer.service";
@Controller("employer")
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.employerService.findAll(filterQueryDto);
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() createDto: CreateEmployertDto) {
    return this.employerService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.employerService.delete(id);
  }
}
