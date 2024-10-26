import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogsModule } from "src/blogs/blogs.module";
import { CategoryModule } from "src/categories/category.module";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { MagazineController } from "./magazine.controller";
import { Magazine } from "./magazine.entity";
import { MagazineService } from "./providers/magazine.service";

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    UsersModule,
    BlogsModule,
    FilterDateModule,
    TypeOrmModule.forFeature([Magazine]),
  ],
  controllers: [MagazineController],
  providers: [MagazineService],
  exports: [MagazineService],
})
export class MagazinesModule {}
