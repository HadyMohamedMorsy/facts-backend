import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Tab } from "src/tab/tab.entity";

@Injectable()
export class GallaryTabRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Tab)
    private readonly tabRepository: Repository<Tab>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tabId = req.body?.tabId;

    if (tabId == null || tabId === "") {
      throw new BadRequestException("Missing tabId in body");
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
