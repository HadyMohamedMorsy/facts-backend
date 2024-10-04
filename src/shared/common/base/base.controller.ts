import {
  BadRequestException,
  Body,
  Delete,
  HttpCode,
  Injectable,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { AnyFilesInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { dtoMappings } from "src/shared/config/dto-mapping";
import multerOptions from "src/shared/config/multer-options";
import { FilterQueryDto } from "../filter/dtos/filter.dto";
import { TransformRequest } from "../filter/providers/transform-request.entity.provider";
import { HeaderToBodyInterceptor } from "../interceptor/transfrom-request.interceptor";
import { IBaseService } from "./service.types";

type UpdateDto<CreateDto> = {
  id: number;
} & CreateDto;

@Injectable()
export abstract class BaseController<CreateDto> {
  constructor(
    private readonly baseService: IBaseService<CreateDto>,
    private readonly transform: TransformRequest,
  ) {}
  protected fileFieldName = "featuredImage";
  protected propertiesRel = [];
  protected duplicatedPropertirs = ["order", "slug"];

  @Post("front/index")
  @HttpCode(200)
  public front(@Body() filterQueryDto: FilterQueryDto) {
    return this.baseService.front(filterQueryDto);
  }

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filterQueryDto: FilterQueryDto) {
    return this.baseService.findAll(filterQueryDto);
  }

  @Post("/store")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  public async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createDto: CreateDto,
    @Req() request: Request,
  ) {
    const validatedDto = await this.#processFileUpload(
      request,
      createDto,
      files,
      this.fileFieldName,
    );
    return this.baseService.create(validatedDto);
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  public async update(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() patch: UpdateDto<CreateDto>,
    @Req() request: Request,
  ) {
    const entity = await this.baseService.findOne(+patch.id, this.propertiesRel);
    let updatedDto = this.transform
      .initEntity(request, patch, entity)
      .handleFiles(files)
      .updateEntity()
      .checkDuplicate(this.duplicatedPropertirs)
      .getUpdatedEntity();
    const dto = this.#getDtoForEndpoint(request.path);
    updatedDto = await this.#validateDto(dto, updatedDto, false);
    return this.baseService.update(updatedDto);
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
    files: Array<Express.Multer.File>,
    fieldName: string,
  ): Promise<CreateDto> {
    const dto = this.#getDtoForEndpoint(request.path);
    const baseURL = `${request.protocol}://${request.headers.host}`;
    const modulePath = request.path.split("/")[3];

    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new BadRequestException(`No files provided for field: ${fieldName}`);
    }

    let fileUrls: string[] = [];
    fileUrls = files.map(file => `${baseURL}/public/uploads/${modulePath}/${file.filename}`);

    const updatedDto = {
      ...createDto,
      [fieldName]: fieldName === "featuredImage" || "avatar" ? fileUrls[0] : fileUrls,
    };

    return this.#validateDto(dto, updatedDto);
  }

  #getDtoForEndpoint(path: string) {
    const dtoClass = dtoMappings[path];
    if (!dtoClass) {
      throw new BadRequestException("Invalid endpoint");
    }
    return dtoClass;
  }

  async #validateDto(dtoClass: any, body: CreateDto, isPartial: boolean = true) {
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: isPartial,
    });
    return await validationPipe.transform(body, {
      metatype: dtoClass,
      type: "body",
    });
  }
}
