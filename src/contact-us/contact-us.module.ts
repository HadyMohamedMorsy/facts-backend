import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { ContactUsController } from "./contact-us.controller";
import { Contact } from "./contact-us.entity";
import { ContactUsService } from "./providers/contact-us.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Contact])],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
