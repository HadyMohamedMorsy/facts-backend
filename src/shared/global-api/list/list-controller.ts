import { Body, Controller, Post, Req } from "@nestjs/common";
import { ListService } from "./list.service";

@Controller("lists")
export class ListController {
  constructor(private readonly listsService: ListService) {}

  @Post("/list")
  async getLists(@Body("keys") keys: string[], @Req() req: any) {
    const result = await this.listsService.getLists(keys, req["lang"]);
    return {
      data: result,
    };
  }
  @Post("/list-entity")
  async getEntityLists(@Body() body: { module: string }) {
    return await this.listsService.getEntityList(body.module);
  }
}
