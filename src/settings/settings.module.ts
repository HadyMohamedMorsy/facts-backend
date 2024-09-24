import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { ParentSettings } from "./parent-setting.entity";
import { SettingsService } from "./providers/settings.service";
import { SettingsController } from "./setting.controller";
import { Settings } from "./setting.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Settings, ParentSettings])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
