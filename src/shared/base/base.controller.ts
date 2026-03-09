import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { Auth } from "../decorators/auth.decorator";
import { Roles } from "../decorators/roles.decorator";
import { AuthType } from "../enum/global-enum";
import { QueryConfig } from "../interfaces/query-config.interface";
import { BaseService } from "./base";

@Controller()
export abstract class BaseController<T, CreateDto, UpdateDto> {
  constructor(protected readonly service: BaseService<T, CreateDto, UpdateDto>) {}

  @Post("/front")
  @HttpCode(200)
  @Auth(AuthType.None)
  public async findAll(
    @Body()
    body: QueryConfig | { query?: any } | { start?: number; length?: number; [k: string]: any },
  ) {
    return await this.service.findFront(this.#normalizeFrontBody(body));
  }

  #normalizeFrontBody(
    body: QueryConfig | { query?: any } | { start?: number; length?: number; [k: string]: any },
  ) {
    if (body && typeof body === "object" && "query" in body) {
      return body as { query?: any };
    }

    if (body && typeof body === "object" && ("start" in body || "length" in body)) {
      const start = Number((body as any).start ?? 0);
      const length = Number((body as any).length ?? 10);

      return this.#toFindFrontQuery({
        take: Number.isFinite(length) ? length : 10,
        skip: Number.isFinite(start) ? start : 0,
        isPagination: false,
        filters: (body as any).filters,
        select: (body as any).select,
        relations: (body as any).relations,
        sort: (body as any).sort,
      } satisfies QueryConfig);
    }

    return this.#toFindFrontQuery(body as QueryConfig);
  }

  #toFindFrontQuery(config: QueryConfig) {
    const take = config?.take;
    const skip = config?.skip ?? 0;
    const page = take ? Math.floor(skip / take) + 1 : undefined;

    return {
      query: {
        filters: config?.filters,
        select: config?.select,
        relations: config?.relations,
        sort: config?.sort?.field
          ? { field: config.sort.field, order: config.sort.order ?? "ASC" }
          : undefined,
        page,
        limit: take,
        isPagination: config?.isPagination ? "true" : "false",
      },
    };
  }

  @Post("/index")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Delete("/delete")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
