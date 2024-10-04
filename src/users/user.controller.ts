import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { NoFilesInterceptor } from "@nestjs/platform-express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
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

  @Post("/signup")
  @UseInterceptors(NoFilesInterceptor())
  @UseInterceptors(ClassSerializerInterceptor)
  @Auth(AuthType.None)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public delete(@Body() id: number) {
    return this.userService.delete(id);
  }
}
