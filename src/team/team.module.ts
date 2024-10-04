import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { TeamService } from "./providers/team.service";
import { TeamSocial } from "./team-social.entity";
import { TeamController } from "./team.controller";
import { Team } from "./team.entity";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Team, TeamSocial])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
