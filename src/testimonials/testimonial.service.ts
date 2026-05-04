import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CreateTestimonialDto } from "./dtos/create-testimonial.dto";
import { PatchTestimonialDto } from "./dtos/patch-testimonial.dto";
import { Testimonial } from "./testimonial.entity";

@Injectable()
export class TestimonialService
  extends BaseService<Testimonial, CreateTestimonialDto, PatchTestimonialDto>
  implements ICrudService<Testimonial, CreateTestimonialDto, PatchTestimonialDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Testimonial)
    repository: Repository<Testimonial>,
  ) {
    super(repository, apiFeaturesService);
  }
}
