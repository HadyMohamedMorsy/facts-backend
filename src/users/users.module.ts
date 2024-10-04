import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { RoleModule } from "src/roles/role.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UserService } from "./providers/user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
@Module({
  imports: [
    RoleModule,
    FilterDateModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
