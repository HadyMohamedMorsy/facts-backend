import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UserService } from "./providers/user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
