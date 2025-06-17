import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { SettingsService } from "./providers/settings.service";
import { SettingsController } from "./setting.controller";
import { Settings } from "./setting.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
