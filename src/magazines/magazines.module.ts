import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { Magazine } from "./magazine.entity";
import { MagazineService } from "./providers/magazine.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Magazine])],
  controllers: [],
  providers: [MagazineService],
})
export class MagazinesModule {}
