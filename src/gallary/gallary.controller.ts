import { Controller } from "@nestjs/common";
import { BaseController } from "src/shared/common/base/base.controller";
import { CreateGallarysDto } from "./dtos/create-gallary.dto";
import { GallaryService } from "./providers/gallary.service";

@Controller("gallary")
export class GallaryController extends BaseController<CreateGallarysDto> {
  constructor(private readonly gallaryService: GallaryService) {
    super(gallaryService);
  }
}
