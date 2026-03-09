import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { TeamController } from "./team.controller";
import { Team } from "./team.entity";
import { TeamSocial } from "./team-social.entity";
import { TeamService } from "./team.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Team, TeamSocial])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
