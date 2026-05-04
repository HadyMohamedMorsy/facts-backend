import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { TestimonialController } from "./testimonial.controller";
import { Testimonial } from "./testimonial.entity";
import { TestimonialService } from "./testimonial.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Testimonial])],
  controllers: [TestimonialController],
  providers: [TestimonialService],
  exports: [TestimonialService],
})
export class TestimonialModule {}
