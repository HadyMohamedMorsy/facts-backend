import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { RoleService } from "./providers/role.service";
import { RoleController } from "./role.controller";
import { Role } from "./role.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
