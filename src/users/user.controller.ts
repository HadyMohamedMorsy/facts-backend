import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { NoFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PatchUserDto } from "./dtos/patch-user.dto";
import { UserService } from "./providers/user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly transform: TransformRequest,
  ) {}

  @Post("front/index")
  @HttpCode(200)
  @Auth(AuthType.None)
  public front(@Body() filterQueryDto: FilterQueryDto) {
    return this.userService.front(filterQueryDto);
  }

  @Get("user")
  @HttpCode(200)
  @Auth(AuthType.None)
  public getUser(@Query("email") email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.userService.findAll(filterQueryDto);
  }

  @Post("/signup")
  @UseInterceptors(NoFilesInterceptor())
  @Auth(AuthType.None)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post("/update")
  @UseInterceptors(NoFilesInterceptor())
  public async updateUsers(@Body() updateUserDto: PatchUserDto, @Req() request: Request) {
    const entity = await this.userService.findOneByEmail(updateUserDto.email);
    const updatedDto = this.transform
      .initEntity(request, updateUserDto, entity)
      .updateEntity()
      .checkDuplicate(["username", "email", "phone_number"])
      .getUpdatedEntity();
    if (!updateUserDto.password) delete updatedDto["password"];
    return this.userService.updateUser(updatedDto);
  }

  @Delete("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public delete(@Body() id: number) {
    return this.userService.delete(id);
  }
}
