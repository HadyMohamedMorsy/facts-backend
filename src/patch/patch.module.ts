import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { PatchController } from "./patch.controller";
import { PatchGraduates } from "./patch.entity";
import { PatchService } from "./patch.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([PatchGraduates])],
  controllers: [PatchController],
  providers: [PatchService],
  exports: [PatchService],
})
export class PatchModule {}
