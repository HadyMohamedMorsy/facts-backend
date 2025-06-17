import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";

@Injectable()
export class ListService {
  constructor(private readonly usersService: UserService) {}
  #lists = {};

  async getLists(keys: string[], lang: string): Promise<Record<string, any>> {
    return keys.reduce((result, key) => {
      if (this.#lists[key]?.[lang]) {
        result[key] = this.#lists[key][lang];
      }
      return result;
    }, {});
  }

  async getEntityList(module: string) {
    const strategyMap = {
      user: () => this.usersService.getList({ status: "active" }),
    };

    const strategy = strategyMap[module];
    if (!strategy) {
      throw new Error(`No strategy found for module: ${module}`);
    }

    return await strategy();
  }
}
