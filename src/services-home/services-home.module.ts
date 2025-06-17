import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ServiceService } from "./providers/service.service";
import { ServiceController } from "./service.controller";
import { Service } from "./service.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServicesHomeModule {}
