import {
  BadRequestException,
  Body,
  Delete,
  HttpCode,
  Injectable,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import multerOptions from "src/shared/config/multer-options";
import { dtoMappings } from "../../config/dto-mapping";
import { FilterQueryDto } from "../filter/dtos/filter.dto";
import { HeaderToBodyInterceptor } from "../interceptor/transfrom-request.interceptor";
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
  @UseInterceptors(NoFilesInterceptor())
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
    const validatedDto = await this.#processFileUpload(request, create, file, "featuredImage");
    return this.baseService.create(validatedDto);
  }

  @Post("/store-uploads")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(FileInterceptor("files", multerOptions))
  public async createUploads(
    @UploadedFile() files: Array<Express.Multer.File>,
    @Body() create: CreateDto,
    @Req() request: Request,
  ) {
    if (files && files.length > 0) {
      const validatedDto = await this.#processFileUpload(request, create, files, "featuredImage");
      return this.baseService.create(validatedDto);
    }
  }

  transformUpdate(file: Express.Multer.File, patch: any, request: Request, entityRel: any) {
    if (file) {
      const baseURL = `${request.protocol}://${request.headers.host}`;
      const modulePath = request.path.split("/")[3];
      const fileUrls: string[] = [];
      fileUrls.push(`${baseURL}/public/uploads/${modulePath}/${file.filename}`);
      patch.featuredImage = fileUrls[0];
    }

    Object.keys(patch).forEach(key => {
      if (patch[key] === entityRel[key]) {
        delete patch[key];
      }
    });
    return patch;
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

  @Delete("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public delete(@Body() body: { id: string }, @Req() request: Request) {
    const modulePath = request.path.split("/")[3];
    return this.baseService.delete(+body.id, modulePath);
  }

  async #processFileUpload(
    request: Request,
    createDto: CreateDto,
    files: Express.Multer.File | Array<Express.Multer.File>,
    fieldName: string,
  ): Promise<CreateDto> {
    const dto = this.#getDtoForEndpoint(request.path);
    const baseURL = `${request.protocol}://${request.headers.host}`;
    const modulePath = request.path.split("/")[3];

    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new BadRequestException(`No files provided for field: ${fieldName}`);
    }

    let fileUrls: string[] = [];
    if (Array.isArray(files)) {
      fileUrls = files.map(file => `${baseURL}/public/uploads/${modulePath}/${file.filename}`);
    } else {
      fileUrls.push(`${baseURL}/public/uploads/${modulePath}/${files.filename}`);
    }

    const updatedDto = {
      ...createDto,
      [fieldName]: Array.isArray(files) ? fileUrls : fileUrls[0],
    };

    return this.#validateDto(dto, updatedDto);
  }
}
