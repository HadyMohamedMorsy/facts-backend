import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingProvider } from "src/auth/providers/hashing.provider";
import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
import { DeepPartial, Repository } from "typeorm";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../user.entity";
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly filterData: FilterDataProvider<User>,
  ) {}

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
      user = await this.repository.findOneBy({
        email: email,
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
      // Might save the details of the exception
      // Information which is sensitive
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

    // Create a new user
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

    // try {
    //   await this.mailService.sendUserWelcome(newUser);
    // } catch (error) {
    //   throw new RequestTimeoutException(error);
    // }

    return newUser;
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }
}
