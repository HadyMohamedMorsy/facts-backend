import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ServiceController } from "./service.controller";
import { Service } from "./service.entity";
import { ServiceHomeService } from "./service-home.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceHomeService],
  exports: [ServiceHomeService],
})
export class ServicesHomeModule {}
