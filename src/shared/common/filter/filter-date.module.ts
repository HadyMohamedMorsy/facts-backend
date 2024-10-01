import { Module } from "@nestjs/common";
import { FilterDataProvider } from "./providers/filter-data.provider";
import { TransformRequest } from "./providers/transform-request.entity.provider";

@Module({
  providers: [FilterDataProvider, TransformRequest],
  exports: [FilterDataProvider, TransformRequest],
})
export class FilterDateModule {}
