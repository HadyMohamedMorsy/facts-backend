import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Education } from "src/educations/education.entity";
import { Repository } from "typeorm";

@Injectable()
export class ApplicantEducationRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const educationId = req.body?.educationId;

    if (educationId == null) {
      throw new BadRequestException("Missing education id in body");
    }

    const education = await this.educationRepository
      .createQueryBuilder("e")
      .where("e.id = :id", { id: +educationId })
      .getOne();

    if (!education) {
      throw new BadRequestException(`Education with ID ${educationId} not found`);
    }

    req["education"] = education;
    next();
  }
}
