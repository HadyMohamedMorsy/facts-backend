import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { SocialLinkController } from "./social-link.controller";
import { SocialLink } from "./social-link.entity";
import { SocialLinkService } from "./social-link.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([SocialLink])],
  controllers: [SocialLinkController],
  providers: [SocialLinkService],
  exports: [SocialLinkService],
})
export class SocialLinksModule {}
