import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/common/filter/filter-date.module";
import { Contact } from "./consultancy.entity";
import { ContactUsController } from "./contact-us.controller";
import { ContactUsService } from "./providers/contact-us.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Contact])],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
