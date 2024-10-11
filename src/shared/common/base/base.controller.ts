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
import { access, constants, unlink } from "fs";
import { join } from "path";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
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
      const validatedDto = await this.processFileUpload(request, createDto, files);
      return await this.baseService.create(validatedDto, this.propertiesRel);
    } catch (error) {
      await this.cleanupFiles(files);
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
      await this.#handleFileDeletion(entity, patch, request);
      let updatedDto = await this.transform
        .initEntity(request, patch, entity)
        .cleanFiles()
        .handleFiles(files)
        .updateEntity()
        .checkDuplicate(this.duplicatedPropertirs)
        .getUpdatedEntity();
      const dto = this.#getDtoForEndpoint(request.path);
      updatedDto = await this.#validateDto(dto, updatedDto, false);
      return this.baseService.update(updatedDto, this.propertiesRel);
    } catch (error) {
      await this.cleanupFiles(files);
      throw error;
    }
  }

  @Delete("/delete")
  @UseInterceptors(NoFilesInterceptor())
  public delete(@Body() body: { id: string }, @Req() request: Request) {
    const modulePath = request.path.split("/")[3];
    return this.baseService.delete(+body.id, modulePath);
  }

  async cleanupFiles(files: Express.Multer.File[]) {
    for (const file of files) {
      unlink(file.path, err => {
        if (err) throw err;
        console.log(`${file.path} was deleted`);
      });
    }
  }

  async #handleFileDeletion(entity: any, patch: any, request: Request) {
    const keysToCheck = ["files"];
    for (const key of keysToCheck) {
      if (!patch[key]) {
        patch[key] = []; // Assume empty if not provided
      }
      for (const url of entity[key]) {
        if (!patch[key].includes(url)) {
          await this.#deleteFile(url, request);
        }
      }
    }
  }

  async #deleteFile(url: string, request: Request) {
    const fileName = url.split("/").pop();
    const modulePath = request.path.split("/")[3];
    const fullPath = join(process.cwd(), "public", "uploads", modulePath, fileName);
    const exists = await this.#checkFileExists(fullPath);

    if (exists) {
      unlink(fullPath, err => {
        if (err) throw err;
        console.log(`${fullPath} was deleted`);
      });
    } else {
      console.log(`No file to delete at ${fullPath}`);
    }
  }

  async #checkFileExists(filePath: string): Promise<boolean> {
    return new Promise(resolve => {
      access(filePath, constants.F_OK, err => {
        resolve(!err);
      });
    });
  }

  async processFileUpload(
    request: Request,
    createDto: CreateDto,
    files: Array<Express.Multer.File>,
  ): Promise<CreateDto> {
    const dto = this.#getDtoForEndpoint(request.path);
    const baseURL = `${request.protocol}://${request.headers.host}`;
    const modulePath = request.path.split("/")[3];

    if (!files || (Array.isArray(files) && files.length === 0)) {
      return this.#validateDto(dto, createDto);
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
