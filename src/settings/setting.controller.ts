import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateSettingDto } from "./dtos/create-setting.dto";
import { SettingsService } from "./providers/settings.service";

@Controller("setting")
export class SettingsController {
  constructor(private readonly settingService: SettingsService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.settingService.findAll(filterQueryDto);
  }

  @Post("/store")
  public create(@Body() create: CreateSettingDto) {
    return this.settingService.create(create);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.settingService.delete(id);
  }
}
