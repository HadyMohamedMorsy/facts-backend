import { BadRequestException, Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../role.entity";
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  public async findOneById(id: number) {
    let role = undefined;

    try {
      role = await this.repository.findOne({
        where: { id },
      });
    } catch (err) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        {
          description: `Error connecting to the the datbase ${err}`,
        },
      );
    }

    if (!role) {
      throw new BadRequestException("The role id does not exist");
    }

    return role;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
