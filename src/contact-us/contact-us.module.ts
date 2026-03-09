import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ContactUsController } from "./contact-us.controller";
import { Contact } from "./contact-us.entity";
import { ContactUsService } from "./contact-us.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Contact])],
  controllers: [ContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule {}
