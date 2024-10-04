import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/common/filter/filter-date.module";
import { UsersModule } from "src/users/users.module";
import { EmployerController } from "./employer.controller";
import { Employer } from "./employer.entity";
import { EmployerService } from "./providers/employer.service";

@Module({
  imports: [UsersModule, FilterDateModule, TypeOrmModule.forFeature([Employer])],
  controllers: [EmployerController],
  providers: [EmployerService],
})
export class EmployerModule {}
