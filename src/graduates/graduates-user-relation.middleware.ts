import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";

@Injectable()
export class GraduatesUserRelationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.body?.userId;

    if (userId == null) {
      throw new BadRequestException("Missing user id in body");
    }

    const user = await this.userRepository
      .createQueryBuilder("u")
      .where("u.id = :id", { id: +userId })
      .getOne();

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    req["user"] = user;
    next();
  }
}
