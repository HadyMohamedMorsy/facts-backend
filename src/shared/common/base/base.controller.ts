import {
  BadRequestException,
  Body,
  HttpCode,
  Injectable,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { FilterQueryDto } from "../filter/dtos/filter.dto";
import { HeaderToBodyInterceptor } from "../interceptor/transfrom-request.interceptor";
import { dtoMappings } from "./dto-mapping";
import { multerOptions } from "./multer-options";
import { IBaseService } from "./service.types";

@Injectable()
export abstract class BaseController<CreateDto> {
  constructor(private readonly baseService: IBaseService<CreateDto>) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.baseService.findAll(filterQueryDto);
  }

  @Post("/store")
  @UseInterceptors(HeaderToBodyInterceptor)
  public create(@Body() createDto: CreateDto) {
    return this.baseService.create(createDto);
  }

  @Post("/store-upload")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("featuredImage", multerOptions))
  public async createUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() create: CreateDto,
    @Req() request: Request,
  ) {
    const dto = this.#getDtoForEndpoint(request.path);
    const baseURL = `${request.protocol}://${request.headers.host}`;
    const modulePath = request.path.split("/")[3];
    let createDto = create;
    if (file) {
      const filePath = `${baseURL}/uploads/${modulePath}/${file.filename}`;
      createDto = { ...createDto, featuredImage: filePath };
    }
    const validatedDto = await this.#validateDto(dto, createDto);
    return this.baseService.create(validatedDto);
  }

  @Post("/store-uploads")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("files", multerOptions))
  public createUploads(
    @UploadedFile() files: Array<Express.Multer.File>,
    @Body() create: CreateDto,
    @Req() request: Request,
  ) {
    if (files && files.length > 0) {
      const modulePath = request.path.split("/")[3];
      const baseURL = request.protocol + "://" + request.headers.host;
      const newUrl = new URL(request.url, baseURL);
      const createDto = {
        ...create,
        files: files.map(
          file => `${newUrl.origin}${newUrl.pathname}uploads/${modulePath}/${file.filename}`,
        ),
      };
      return this.baseService.create(createDto);
    }
  }

  #getDtoForEndpoint(path: string) {
    const dtoClass = dtoMappings[path];
    if (!dtoClass) {
      throw new BadRequestException("Invalid endpoint");
    }
    return dtoClass;
  }

  async #validateDto(dtoClass: any, body: CreateDto) {
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    return await validationPipe.transform(body, {
      metatype: dtoClass,
      type: "body",
    });
  }

  @Post("/delete")
  public delete(@Body() id: number) {
    return this.baseService.delete(id);
  }
}
