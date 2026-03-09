import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Contact } from "./contact-us.entity";
import { ContactUsService } from "./contact-us.service";
import { CreateContactDto } from "./dtos/create-contact.dto";
import { PatchContactDto } from "./dtos/patch-contact.dto";

@Controller("contact")
export class ContactUsController
  extends BaseController<Contact, CreateContactDto, PatchContactDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ContactUsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      email: true,
      fullName: true,
      subject: true,
      phoneNumber: true,
      message: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {};
  }

  @Post("/store")
  @Auth(AuthType.None)
  public async create(@Body() create: CreateContactDto) {
    return await this.service.create(
      {
        email: create.email,
        fullName: create.fullName,
        subject: create.subject,
        phoneNumber: create.phoneNumber,
        message: create.message,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchContactDto) {
    return await this.service.update(
      {
        id: update.id,
        email: update.email,
        fullName: update.fullName,
        subject: update.subject,
        phoneNumber: update.phoneNumber,
        message: update.message,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
