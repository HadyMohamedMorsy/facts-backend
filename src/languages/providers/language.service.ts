import { BadRequestException, Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Language } from "../language.entity";

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private langRepository: Repository<Language>,
  ) {}
  public async findOneById(id: number) {
    let lang = undefined;

    try {
      lang = await this.langRepository.findOneBy({
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

    if (!lang) {
      throw new BadRequestException("The user id does not exist");
    }

    return lang;
  }
}
