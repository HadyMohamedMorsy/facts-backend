import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserService } from "./providers/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.userService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateUserDto) {
    return this.userService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.userService.delete(id);
  }
}
