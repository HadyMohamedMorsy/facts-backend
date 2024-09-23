import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { TeamService } from "./providers/team.service";
import { TeamController } from "./team.controller";
import { Team } from "./team.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Team])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
