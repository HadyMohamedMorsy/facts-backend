import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConsultancyModule } from "./consultancy/consultancy.module";
import { ContactUsModule } from "./contact-us/contact-us.module";
import { EducationsModule } from "./educations/educations.module";
import { GallaryModule } from "./gallary/gallary.module";
import { JobsModule } from "./jobs/jobs.module";
import { LanguagesModule } from "./languages/languages.module";
import { MagazinesModule } from "./magazines/magazines.module";
import { PartnersModule } from "./partners/partners.module";
import { RoleModule } from "./roles/role.module";
import { SettingsModule } from "./settings/settings.module";
import { FilterDateModule } from "./shared/common/filter/filter-date.module";
import { FilterDataProvider } from "./shared/common/filter/providers/filter-data.provider";
import { TeamModule } from "./team/team.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    RoleModule,
    TeamModule,
    SettingsModule,
    LanguagesModule,
    ContactUsModule,
    GallaryModule,
    UsersModule,
    PartnersModule,
    MagazinesModule,
    JobsModule,
    EducationsModule,
    ConsultancyModule,
    FilterDateModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: "postgres",
        synchronize: true,
        port: 5432,
        username: "postgres",
        password: "123",
        host: "localhost",
        autoLoadEntities: true,
        database: "facts",
      }),
    }),
  ],
  controllers: [AppController],
  providers: [FilterDataProvider, AppService],
})
export class AppModule {}
