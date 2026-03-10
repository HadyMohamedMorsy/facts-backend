import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Tab } from "src/tab/tab.entity";
import { Repository } from "typeorm";

@Injectable()
export class GraduatesTabRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Tab)
    private readonly tabRepository: Repository<Tab>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tabId = req.body?.tabId;

    // Keep backward compatibility: if tabId isn't provided, do not block the request.
    if (tabId == null || tabId === "") {
      req["tab"] = null;
      return next();
    }

    const tab = await this.tabRepository
      .createQueryBuilder("t")
      .where("t.id = :id", { id: +tabId })
      .getOne();

    if (!tab) {
      throw new BadRequestException(`Tab with ID ${tabId} not found`);
    }

    req["tab"] = tab;
    next();
  }
}
