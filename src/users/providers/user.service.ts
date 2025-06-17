import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interface/crud-service.interface";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PatchUserDto } from "../dtos/patch-user.dto";
import { User } from "../user.entity";

@Injectable()
export class UserService
  extends BaseService<User, CreateUserDto, PatchUserDto>
  implements ICrudService<User, CreateUserDto, PatchUserDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository, apiFeaturesService);
  }

  public async findOneByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(`${email} not found`);
    }
    return user;
  }
}
