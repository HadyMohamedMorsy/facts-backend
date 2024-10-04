import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { BlogController } from "./blog.controller";
import { Blog } from "./blog.entity";
import { BlogService } from "./providers/blog.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogsModule {}
