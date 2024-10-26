import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { PatchController } from "./patch.controller";
import { PatchGraduates } from "./patch.entity";
import { PatchService } from "./providers/patch.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([PatchGraduates])],
  controllers: [PatchController],
  providers: [PatchService],
})
export class PatchModule {}
