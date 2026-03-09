import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Graduates } from "src/graduates/graduates.entity";
import { Repository } from "typeorm";

@Injectable()
export class ApplicantGraduatesRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Graduates)
    private readonly graduatesRepository: Repository<Graduates>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const graduateId = req.body?.graduateId;

    if (graduateId == null) {
      throw new BadRequestException("Missing graduate id in body");
    }

    const graduate = await this.graduatesRepository
      .createQueryBuilder("g")
      .where("g.id = :id", { id: +graduateId })
      .getOne();

    if (!graduate) {
      throw new BadRequestException(`Graduate with ID ${graduateId} not found`);
    }

    req["graduate"] = graduate;
    next();
  }
}
