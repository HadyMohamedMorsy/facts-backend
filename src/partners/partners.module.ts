import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { PartnersController } from "./partners.controller";
import { Partner } from "./partner.entity";
import { PartnerService } from "./partner.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Partner])],
  controllers: [PartnersController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnersModule {}
