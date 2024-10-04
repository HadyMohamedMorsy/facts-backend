import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { GallaryController } from "./gallary.controller";
import { Gallary } from "./gallary.entity";
import { GallaryService } from "./providers/gallary.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Gallary])],
  controllers: [GallaryController],
  providers: [GallaryService],
})
export class GallaryModule {}
