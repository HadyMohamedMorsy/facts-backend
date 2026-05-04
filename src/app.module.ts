import { CacheModule } from "@nestjs/cache-manager";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdvertisementModule } from "./advertisements/advertisement.module";
import { AuthModule } from "./auth/auth.module";
import jwtConfig from "./auth/config/jwt.config";
import { AccessTokenGuard } from "./auth/guards/access-token/access-token.guard";
import { AuthenticationGuard } from "./auth/guards/authentication/authentication.guard";
import { RolesGuard } from "./auth/guards/roles/roles.guard";
import { ApplicantEducationModule } from "./applicants-education/applicant-education.module";
import { ApplicantGraduatesModule } from "./applicants-graduates/applicant-graduates.module";
import { ApplicantJobModule } from "./applicants-job/applicant-job.module";
import { BannerModule } from "./banner/banner.module";
import { BlogModule } from "./blogs/blog.module";
import { CategoryModule } from "./categories/category.module";
import { ContactUsModule } from "./contact-us/contact-us.module";
import { ConsultancyModule } from "./consultancy/consultancy.module";
import { EducationModule } from "./educations/education.module";
import { EmployerModule } from "./employer/employer.module";
import { GallaryModule } from "./gallary/gallary.module";
import { GeneralSettingsModule } from "./general-settings/settings.module";
import { GraduatesModule } from "./graduates/graduates.module";
import { HeroSliderModule } from "./hero-sliders/hero-slider.module";
import { JobsModule } from "./jobs/jobs.module";
import { LanguageModule } from "./language/language.module";
import { MagazinesModule } from "./magazines/magazines.module";
import { PartnersModule } from "./partners/partners.module";
import { PatchModule } from "./patch/patch.module";
import { ProfileModule } from "./profile/profile.module";
import { ServicesHomeModule } from "./services-home/services-home.module";
import { SocialLinksModule } from "./social-links/social-links.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { SubscribtionModule } from "./subscribtion/subscribtion.module";
import { TabModule } from "./tab/tab.module";
import { TeamModule } from "./team/team.module";
import { TestimonialModule } from "./testimonials/testimonial.module";
import appConfig from "./shared/config/app.config";
import databaseConfig from "./shared/config/database.config";
import { FilterDateModule } from "./shared/filters/filter-date.module";
import { APIFeaturesService } from "./shared/filters/filter.service";
import { UploadsModule } from "./shared/global-api/uploads/uploads.module";
import { TransformInterceptor } from "./shared/interceptor/transform-response.interceptor";
import { ListModule } from "./shared/list/list.module";
import { LanMiddleware } from "./shared/middleware/lang.middleware";
import { UserMiddleware } from "./shared/middleware/user.middleware";
import { EmailModule } from "./shared/services/email.module";
import { SharedModule } from "./shared/shared.module";
import enviromentValidation from "./shared/validations/env.validation";
import { UserModule } from "./users/users.module";
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    SharedModule,
    EmailModule,
    UploadsModule,
    FilterDateModule,
    LanguageModule,
    UserModule,
    BlogModule,
    ListModule,
    MagazinesModule,
    PartnersModule,
    CategoryModule,
    TabModule,
    GallaryModule,
    AuthModule,
    AdvertisementModule,
    ApplicantEducationModule,
    ApplicantGraduatesModule,
    ApplicantJobModule,
    BannerModule,
    ContactUsModule,
    ConsultancyModule,
    EducationModule,
    EmployerModule,
    GeneralSettingsModule,
    GraduatesModule,
    HeroSliderModule,
    JobsModule,
    PatchModule,
    ProfileModule,
    ServicesHomeModule,
    SocialLinksModule,
    StatisticsModule,
    SubscribtionModule,
    TeamModule,
    TestimonialModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    CacheModule.register({
      ttl: 5000,
      max: 10,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
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
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        database: configService.get("database.name"),
        username: configService.get("database.user"),
        password: configService.get("database.password"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    APIFeaturesService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanMiddleware).forRoutes("*");
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: "auth/login", method: RequestMethod.ALL },
        { path: "contact/store", method: RequestMethod.ALL },
        { path: "sub/create", method: RequestMethod.ALL },
        { path: "sub/subscribe", method: RequestMethod.ALL },
      )
      .forRoutes(
        { path: "*/store", method: RequestMethod.POST },
        { path: "*/update", method: RequestMethod.POST },
      );
  }
}
