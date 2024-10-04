import { Body, Controller, Post } from "@nestjs/common";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { CreateContactDto } from "./dtos/create-contact";
import { ContactUsService } from "./providers/contact-us.service";
@Controller("contact")
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post("/index")
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.contactUsService.findAll(filterQueryDto);
  }

  @Post("/store")
  public async create(@Body() createDto: CreateContactDto) {
    return this.contactUsService.create(createDto);
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.contactUsService.delete(id);
  }
}
