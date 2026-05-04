import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { CreateTestimonialDto } from "./dtos/create-testimonial.dto";
import { PatchTestimonialDto } from "./dtos/patch-testimonial.dto";
import { Testimonial } from "./testimonial.entity";
import { TestimonialService } from "./testimonial.service";

@Controller("testimonial")
export class TestimonialController
  extends BaseController<Testimonial, CreateTestimonialDto, PatchTestimonialDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: TestimonialService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      content: true,
      featuredImage: true,
      rating: true,
      orderIndex: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: { id: true, firstName: true, lastName: true, email: true },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() create: CreateTestimonialDto, @Req() req: Request) {
    return await this.service.create(
      {
        createdBy: req["createdBy"],
        content: create.content,
        featuredImage: create.featuredImage,
        rating: create.rating,
        orderIndex: create.orderIndex,
        isActive: create.isActive,
      } as any,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchTestimonialDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        createdBy: req["createdBy"],
        content: update.content,
        featuredImage: update.featuredImage,
        rating: update.rating,
        orderIndex: update.orderIndex,
        isActive: update.isActive,
      } as any,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
