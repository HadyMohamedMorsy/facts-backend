import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ProfileController } from "./profile.controller";
import { Profile } from "./profile.entity";
import { ProfileService } from "./providers/profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService, APIFeaturesService],
  exports: [ProfileService],
})
export class ProfileModule {}
