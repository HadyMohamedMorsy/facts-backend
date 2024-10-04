import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { SocialLinkService } from "./providers/social-link.service";
import { SocialLinkController } from "./social-link.controller";
import { SocialLink } from "./social-link.entity";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([SocialLink])],
  controllers: [SocialLinkController],
  providers: [SocialLinkService],
})
export class SocialLinksModule {}
