import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleService } from "./providers/role.service";
import { RoleController } from "./role.controller";
import { Role } from "./role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
