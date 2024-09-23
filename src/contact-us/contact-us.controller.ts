import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { ContactUsService } from "./providers/contact-us.service";
@Controller("contact")
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.contactUsService.findAll(filterQueryDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.contactUsService.delete(id);
  }
}
