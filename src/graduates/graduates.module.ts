import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { GraduatesController } from "./graduates.controller";
import { Graduates } from "./graduates.entity";
import { GraduatesService } from "./providers/graduates.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Graduates])],
  controllers: [GraduatesController],
  providers: [GraduatesService],
})
export class GraduatesModule {}
