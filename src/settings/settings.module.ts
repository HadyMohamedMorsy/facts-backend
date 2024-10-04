import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { SettingsService } from "./providers/settings.service";
import { SettingsController } from "./setting.controller";
import { Settings } from "./setting.entity";

@Module({
  imports: [UsersModule, FilterDateModule, FilterDateModule, TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
