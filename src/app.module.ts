import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AdvertisementsModule } from "./advertisements/advertisements.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApplicantEducationModule } from "./applicants-education/applicants-education.module";
import { ApplicantGraduatesModule } from "./applicants-graduates/applicants-graduates.module";
import { ApplicantJobsModule } from "./applicants-job/applicants-job.module";
import { AuthModule } from "./auth/auth.module";
import jwtConfig from "./auth/config/jwt.config";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";
import { BannerModule } from "./banner/banner.module";
import { BlogsModule } from "./blogs/blogs.module";
import { CategoryModule } from "./categories/category.module";
import { ConsultancyModule } from "./consultancy/consultancy.module";
import { ContactUsModule } from "./contact-us/contact-us.module";
import { EducationsModule } from "./educations/educations.module";
import { EmployerModule } from "./employer/employer.module";
import { GallaryModule } from "./gallary/gallary.module";
import { GraduatesModule } from "./graduates/graduates.module";
import { HeroSliderModule } from "./hero-sliders/hero-slider.module";
import { JobsModule } from "./jobs/jobs.module";
import { MagazinesModule } from "./magazines/magazines.module";
import { MailModule } from "./mail/mail.module";
import { PartnersModule } from "./partners/partners.module";
import { PatchModule } from "./patch/patch.module";
import { ProfileModule } from "./profile/profile.module";
import { RoleModule } from "./roles/role.module";
// import { ServicesHomeModule } from "./services-home/services-home.module";
import { ServicesHomeModule } from "./services-home/services-home.module";
import { SettingsModule } from "./settings/settings.module";
import { FilterDateModule } from "./shared/common/filter/filter-date.module";
import { FilterDataProvider } from "./shared/common/filter/providers/filter-data.provider";
import { TransformInterceptor } from "./shared/common/interceptor/transform-response.interceptor";
import appConfig from "./shared/config/app.config";
import databaseConfig from "./shared/config/database.config";
import enviromentValidation from "./shared/config/enviroment.validation";
import { SocialLinksModule } from "./social-links/social-links.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { SubscribtionModule } from "./subscribtion/subscribtion.module";
import { TeamModule } from "./team/team.module";
import { UsersModule } from "./users/users.module";

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ServicesHomeModule,
    GraduatesModule,
    EmployerModule,
    SocialLinksModule,
    SubscribtionModule,
    ApplicantJobsModule,
    ApplicantEducationModule,
    AdvertisementsModule,
    BlogsModule,
    SocialLinksModule,
    StatisticsModule,
    BannerModule,
    HeroSliderModule,
    CategoryModule,
    PatchModule,
    RoleModule,
    TeamModule,
    ApplicantGraduatesModule,
    SettingsModule,
    ContactUsModule,
    GallaryModule,
    MailModule,
    UsersModule,
    PartnersModule,
    MagazinesModule,
    JobsModule,
    EducationsModule,
    ConsultancyModule,
    FilterDateModule,
    MailModule,
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env.development', '.env'],
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        port: configService.get("database.port"),
        username: configService.get("database.user"),
        password: configService.get("database.password"),
        host: configService.get("database.host"),
        database: configService.get("database.name"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["dist/migrations/*{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    FilterDataProvider,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
