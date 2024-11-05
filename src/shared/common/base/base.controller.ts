import {
  Body,
  Delete,
  HttpCode,
  Injectable,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import multerOptions from "src/shared/config/multer-options";
import { checkUpdateFiles, cleanFilesWithError } from "src/shared/helpers/utilits";
import { FilterQueryDto } from "../filter/dtos/filter.dto";
import { TransformRequest } from "../filter/providers/transform-request.entity.provider";
import { HeaderToBodyInterceptor } from "../interceptor/transfrom-request.interceptor";
import { validateDto } from "../pipes/validateDto.pipe";
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
  protected propertiesRel = ["created_by"];
  protected duplicatedPropertirs = ["order", "slug"];

  @Post("front/index")
  @HttpCode(200)
  @Auth(AuthType.None)
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
    try {
      const validateBody = await this.processFileUpload(request, createDto, files);
      return await this.baseService.create(validateBody, this.propertiesRel);
    } catch (error) {
      cleanFilesWithError(files);
      throw error;
    }
  }

  @Post("/update")
  @UseInterceptors(HeaderToBodyInterceptor)
  @UseInterceptors(AnyFilesInterceptor(multerOptions))
  public async update(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() patch: UpdateDto<CreateDto>,
    @Req() request: Request,
  ) {
    try {
      const entity = await this.baseService.findOne(+patch.id, this.propertiesRel);
      checkUpdateFiles(entity, patch, request);
      const body = await this.transform
        .initEntity(request, patch, entity)
        .handleFiles(files)
        .checkDuplicate(this.duplicatedPropertirs)
        .updateEntity()
        .getUpdatedEntity();
      const validateBody = await validateDto<CreateDto>(request.path, body, false);
      return await this.baseService.update(validateBody, this.propertiesRel);
    } catch (error) {
      cleanFilesWithError(files);
      throw error;
    }
  }

  @Delete("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public async delete(@Body() body: { id: string }, @Req() request: Request) {
    return await this.baseService.delete(+body.id, request);
  }

  async processFileUpload(
    request: Request,
    createDto: CreateDto,
    files: Array<Express.Multer.File>,
  ): Promise<CreateDto> {
    const baseURL = `${request.protocol}://${request.headers.host}`;
    const modulePath = request.path.split("/")[3];

    if (!files || (Array.isArray(files) && files.length === 0)) {
      return validateDto(request.path, createDto);
    }
    const updatedDto = { ...createDto };
    const fileGroup = {};

    files.forEach(file => {
      const fileUrl = `${baseURL}/public/uploads/${modulePath}/${file.filename}`;
      const fieldname = file.fieldname.replace(/\[\d+\]$/, "");

      if (fileGroup[fieldname]) {
        fileGroup[fieldname].push(fileUrl);
      } else {
        fileGroup[fieldname] = [fileUrl];
      }
    });

    Object.keys(fileGroup).forEach(fieldname => {
      if (fileGroup[fieldname].length > 1) {
        updatedDto[fieldname] = fileGroup[fieldname];
      } else {
        updatedDto[fieldname] = fileGroup[fieldname][0];
      }
    });

    return validateDto(request.path, updatedDto);
  }
}
