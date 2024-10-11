import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingProvider } from "src/auth/providers/hashing.provider";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { TransformRequest } from "src/shared/common/filter/providers/transform-request.entity.provider";
import { DeepPartial, Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { PatchUserDto } from "../dtos/patch-user.dto";
import { User } from "../user.entity";
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly filterData: FilterDataProvider<User>,
    private readonly transform: TransformRequest,
  ) {}

  public async findAll(filter: FilterQueryDto) {
    const entity = await this.filterData
      .initRepositry("user", this.repository, filter)
      .filter()
      .sort()
      .paginate()
      .provideFields(["firstName", "lastName", "country", "phone_number", "address"])
      .joinRelations("role", ["name", "id"])
      .search()
      .execute();
    const result = await this.filterData.initRepositry("user", this.repository, filter).count();

    return {
      data: entity,
      recordsFiltered: entity.length,
      totalRecords: +result,
    };
  }

  async front(filter: FilterQueryDto) {
    const entity = await this.filtersFront(filter, "user").execute();
    return {
      data: entity,
    };
  }

  filtersFront(filter: FilterQueryDto, entityType: string) {
    const entity = this.filterData
      .initRepositry(entityType, this.repository, filter)
      .paginate()
      .searchFrontOnly(filter.search, ["username"])
      .filterByActive();
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
          description: `Error connecting to the the datbase ${err}`,
        },
      );
    }

    if (!user) {
      throw new BadRequestException("The user id does not exist");
    }

    return user;
  }

  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      // This will return null if the user is not found
      user = await this.repository.findOne({
        where: { email },
        relations: ["role"],
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: "Could not fetch the user",
      });
    }

    if (!user) {
      throw new UnauthorizedException("User does not exists");
    }

    return user;
  }

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      // Check is user exists with same email
      existingUser = await this.repository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        {
          description: `Error connecting to the database ${error}`,
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException("The user already exists, please check your email.");
    }

    let newUser = this.repository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    } as DeepPartial<User>);

    try {
      newUser = await this.repository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        {
          description: `Error connecting to the the datbase ${error}`,
        },
      );
    }

    const result = await this.repository.findOne({
      where: { id: +newUser.id },
      relations: ["role"],
      select: [
        "firstName",
        "lastName",
        "email",
        "gender",
        "username",
        "address",
        "is_active",
        "created_at",
        "updated_at",
        "country",
        "phone_number",
        "id",
      ],
    });

    if (!result) {
      throw new NotFoundException(`Entity with ID ${newUser.id} not found`);
    }

    return result;

    // try {
    //   await this.mailService.sendUserWelcome(newUser);
    // } catch (error) {
    //   throw new RequestTimeoutException(error);
    // }
  }

  async updateUser(patch: PatchUserDto) {
    let existingUser = undefined;
    if (patch.email) {
      try {
        existingUser = await this.repository.findOne({
          where: { email: patch.email },
        });
      } catch (error) {
        throw new RequestTimeoutException(
          "Unable to process your request at the moment please try later",
          {
            description: `Error connecting to the database ${error}`,
          },
        );
      }

      // Handle exception
      if (existingUser) {
        throw new BadRequestException("The user already exists, please check your email.");
      }
    }

    if (patch.password) {
      patch.password = await this.hashingProvider.hashPassword(patch.password);
    }

    let updateUser = undefined;

    try {
      updateUser = await this.repository.save(patch as DeepPartial<User>);
    } catch (error) {
      throw new RequestTimeoutException(
        "Unable to process your request at the moment please try later",
        {
          description: `Error connecting to the the datbase ${error}`,
        },
      );
    }

    const result = await this.repository.findOne({
      where: { id: +updateUser.id },
      relations: ["role"],
      select: [
        "firstName",
        "lastName",
        "email",
        "gender",
        "username",
        "address",
        "is_active",
        "created_at",
        "updated_at",
        "country",
        "phone_number",
        "id",
      ],
    });

    if (!result) {
      throw new NotFoundException(`Entity with ID ${updateUser.id} not found`);
    }

    return result;

    // try {
    //   await this.mailService.sendUserWelcome(newUser);
    // } catch (error) {
    //   throw new RequestTimeoutException(error);
    // }
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
