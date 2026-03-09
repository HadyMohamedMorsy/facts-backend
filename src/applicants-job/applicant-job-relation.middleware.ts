import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Job } from "src/jobs/job.entity";
import { Repository } from "typeorm";

@Injectable()
export class ApplicantJobRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const jobId = req.body?.jobId;

    if (jobId == null) {
      throw new BadRequestException("Missing job id in body");
    }

    const job = await this.jobRepository
      .createQueryBuilder("j")
      .where("j.id = :id", { id: +jobId })
      .getOne();

    if (!job) {
      throw new BadRequestException(`Job with ID ${jobId} not found`);
    }

    req["job"] = job;
    next();
  }
}
