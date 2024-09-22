import { Module } from "@nestjs/common";
import { FilterDataProvider } from "./providers/filter-data.provider";

@Module({
  providers: [FilterDataProvider],
  exports: [FilterDataProvider],
})
export class FilterDateModule {}
