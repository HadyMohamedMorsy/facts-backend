import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { GallaryController } from "./gallary.controller";
import { Gallary } from "./gallary.entity";
import { GallaryService } from "./providers/gallary.service";

@Module({
  imports: [TypeOrmModule.forFeature([Gallary])],
  controllers: [GallaryController],
  providers: [GallaryService, APIFeaturesService],
})
export class GallaryModule {}
