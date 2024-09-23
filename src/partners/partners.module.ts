import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { Partner } from "./partner.entity";
import { PartnersController } from "./partners.controller";
import { PartnersService } from "./providers/partners.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Partner])],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
