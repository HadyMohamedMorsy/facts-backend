import { BadRequestException, Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly filterData: FilterDataProvider<User>,
  ) {}

  public async create(create: CreateUserDto) {
    const user = this.repository.create({ ...create });
    return await this.repository.save(user);
  }

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("user", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .search()
      .execute();
    return entity;
  }

  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        {
          description: "Error connecting to the the datbase",
        },
      );
    }

    if (!user) {
      throw new BadRequestException("The user id does not exist");
    }

    return user;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
