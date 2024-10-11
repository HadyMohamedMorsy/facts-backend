import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "src/categories/category.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { MagazineController } from "./magazine.controller";
import { Magazine } from "./magazine.entity";
import { MagazineService } from "./providers/magazine.service";

@Module({
  imports: [UsersModule, CategoryModule, FilterDateModule, TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazineController],
  providers: [MagazineService],
})
export class MagazinesModule {}
