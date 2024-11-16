import { MigrationInterface, QueryRunner } from "typeorm";

export class Firstmigrations1731712390430 implements MigrationInterface {
  name = "Firstmigrations1731712390430";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "applicant_graduates" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "graduateId" integer, CONSTRAINT "PK_a4030614e0fda8b1f337ef8270c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "graduates" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "selectUser" json, "type" character varying(256) NOT NULL, "slug" character varying(512) NOT NULL, "description_en" character varying NOT NULL, "description_ar" character varying NOT NULL, "courses" text NOT NULL, "course_name" character varying NOT NULL, "code_certification" character varying NOT NULL, "date_course" date, "featuredImage" character varying NOT NULL, "attachment" character varying NOT NULL, "image_certification" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "created_by" integer, CONSTRAINT "UQ_aea2e79f6713c35082e88448d70" UNIQUE ("slug"), CONSTRAINT "PK_264f3944ca36603aa1da616f5dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('admin', 'user', 'employee', 'employer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" "public"."role_name_enum" NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female')`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(96) NOT NULL, "lastName" character varying(96), "username" character varying(96), "phone_number" character varying, "country" character varying(96), "email" character varying(96) NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "address" text, "password" character varying(96), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscribe" ("id" SERIAL NOT NULL, "email_subscribe" text NOT NULL, "type" text NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, CONSTRAINT "UQ_9cdc4b417486bd07a7536384c8c" UNIQUE ("email_subscribe"), CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_en" character varying(256) NOT NULL, "name_ar" character varying(256) NOT NULL, "phone_number" text array NOT NULL, "description_en" text NOT NULL, "description_ar" text NOT NULL, "position_en" text, "position_ar" text, "featuredImage" character varying(1024) NOT NULL, "created_by" integer, CONSTRAINT "UQ_a03f31520c10389c2bacc072f4e" UNIQUE ("order"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team_social" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "icon" character varying(256) NOT NULL, "link" character varying(256) NOT NULL, "teamId" integer, CONSTRAINT "PK_ba082a829abd165d0ee09eb05e3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "statistics" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "value" integer NOT NULL, "icon" character varying(1024) NOT NULL, "created_by" integer, CONSTRAINT "UQ_3fd0936fb426ffc50d0fb68b5d8" UNIQUE ("order"), CONSTRAINT "UQ_3fd0936fb426ffc50d0fb68b5d8" UNIQUE ("order"), CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "social_link" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "icon" text NOT NULL, "link" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_ab251d2d279cdb1b78c3560e3ab" UNIQUE ("order"), CONSTRAINT "PK_51b2adcc50ae969ba051eacd714" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_en" character varying(256) NOT NULL, "name_ar" character varying(256) NOT NULL, "link" character varying(256), "featuredImage" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_1f6c75b1fc125a9eeaa3d0232cd" UNIQUE ("order"), CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "patch_graduates" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_en" character varying(256) NOT NULL, "name_ar" character varying(256) NOT NULL, "year" character varying(5) NOT NULL, "description_en" text, "description_ar" text, "files" text array NOT NULL, "created_by" integer, CONSTRAINT "UQ_ac7a46d5fc677a1c187b1e7ef11" UNIQUE ("order"), CONSTRAINT "PK_6300ce8125704fa6dc38bcedd37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "section_name" character varying(256), "title_en" character varying(256), "title_ar" character varying(256), "link" character varying(256), "slug" character varying(512) NOT NULL, "description_en" text, "description_ar" text, "short_description_en" text, "short_description_ar" text, "icon" character varying(1024), "featuredImage" text, "screen_shot" text, "created_by" integer, CONSTRAINT "UQ_d0453bf406747ab028528048c66" UNIQUE ("order"), CONSTRAINT "UQ_14378107ac6bb5b9577f6810d59" UNIQUE ("slug"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."profile_gender_enum" AS ENUM('male', 'female')`);
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "first_name" character varying(256) NOT NULL, "last_name" character varying(256) NOT NULL, "age" character varying(3) NOT NULL, "gender" "public"."profile_gender_enum" NOT NULL DEFAULT 'male', "country" character varying, "phone_number" character varying(12) NOT NULL, "experience" character varying(12) NOT NULL, "skills" text NOT NULL, "facebook" character varying, "achievements" character varying, "attachment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "slug" character varying(256) NOT NULL, "meta_title_en" character varying(256), "meta_title_ar" character varying(256), "meta_description_en" text, "meta_description_ar" text, "short_description_en" text, "short_description_ar" text, "description_en" text NOT NULL, "description_ar" text NOT NULL, "featuredImage" text NOT NULL, "thumbnail" text NOT NULL, "selectMagazine" json, "created_by" integer, "magazineId" integer, CONSTRAINT "UQ_1a70b73be65257bf9878725d9f1" UNIQUE ("order"), CONSTRAINT "UQ_0dc7e58d73a1390874a663bd599" UNIQUE ("slug"), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_en" character varying(255) NOT NULL, "name_ar" character varying(255) NOT NULL, "slug" character varying(512) NOT NULL, "created_by" integer, CONSTRAINT "UQ_b0d62a0c9cde6f7bac8edfbdc73" UNIQUE ("order"), CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "magazine" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_ar" character varying(256) NOT NULL, "title_en" character varying(256) NOT NULL, "slug" character varying(512) NOT NULL, "short_description_ar" character varying(1024) NOT NULL, "short_description_en" character varying(1024) NOT NULL, "featuredImage" text NOT NULL, "publication_date" date, "selectedCategories" json, "created_by" integer, CONSTRAINT "UQ_64fe8be2e49b163bfda5cbc7ca1" UNIQUE ("order"), CONSTRAINT "UQ_4c18b280c9b20fc2f1314210f8f" UNIQUE ("slug"), CONSTRAINT "PK_cc5e06a8dfb114bc452138aef3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "partner" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "link" character varying(256) NOT NULL, "description_en" text NOT NULL, "description_ar" text NOT NULL, "featuredImage" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_c7d5166fb77a431c67e8bb101d9" UNIQUE ("order"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero_slider" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "short_description_en" text NOT NULL, "short_description_ar" text NOT NULL, "featuredImage" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_b2b692084e6ab8d06aa2f6b6340" UNIQUE ("order"), CONSTRAINT "PK_42a037ad2cd113135b88fe062b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gallary" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "accordion_title_en" character varying(256) NOT NULL, "accordion_title_ar" character varying(256) NOT NULL, "files" text array NOT NULL, "created_by" integer, CONSTRAINT "UQ_8b04d6437951dadac8379e37fa9" UNIQUE ("order"), CONSTRAINT "PK_519f5434e3877b4bf82360e102b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employer" ("id" SERIAL NOT NULL, "company_name" text NOT NULL, "business_type" text NOT NULL, "industry" text NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "company_address" text NOT NULL, "company_phone" text NOT NULL, "company_email" text NOT NULL, "website_url" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "applicant_education" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "educationId" integer, CONSTRAINT "PK_2219efe9597e44a6ecc54e6f179" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "education_accordion" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "accordion_title_en" character varying(512) NOT NULL, "accordion_title_ar" character varying(512) NOT NULL, "description_en" text NOT NULL, "description_ar" text NOT NULL, "educationId" integer, CONSTRAINT "PK_fbbcaecddeed6795c3c0fe9c9c8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "education_details" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_en" text NOT NULL, "name_ar" text NOT NULL, "value_en" text NOT NULL, "value_ar" text NOT NULL, "educationId" integer, CONSTRAINT "PK_ad43985edd9bbcc2f6472829a62" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "education" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "slug" character varying(256) NOT NULL, "intro_description_ar" text NOT NULL, "intro_description_en" text NOT NULL, "short_description_en" text NOT NULL, "short_description_ar" text NOT NULL, "featuredImage" text NOT NULL, "thumbnail" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_12a33b99c0c12fb06aea3a6be64" UNIQUE ("order"), CONSTRAINT "UQ_af0bc095015303102f25d8714ea" UNIQUE ("slug"), CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" SERIAL NOT NULL, "email" text NOT NULL, "full_name" character varying(512) NOT NULL, "subject" character varying(256) NOT NULL, "phone_number" character varying NOT NULL, "message" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "UQ_ea7244afe014b693c35932e449f" UNIQUE ("phone_number"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "consultancy_accordion" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "accordion_title_en" character varying(256) NOT NULL, "accordion_title_ar" character varying(256) NOT NULL, "description_en" character varying(256) NOT NULL, "description_ar" character varying(256) NOT NULL, "consultancyId" integer, CONSTRAINT "PK_a45abcd01c1ef42a49862fdcb7e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "consultancy" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "slug" character varying(512) NOT NULL, "featuredImage" text NOT NULL, "short_description_en" text NOT NULL, "short_description_ar" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_79fc86e772d03f88af8445edc2c" UNIQUE ("order"), CONSTRAINT "PK_d35bbf6b8b484e2e6bb034b7e5d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."job_type_enum" AS ENUM('part_time', 'full_time')`,
    );
    await queryRunner.query(
      `CREATE TABLE "job" ("id" SERIAL NOT NULL, "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "short_description_en" text, "short_description_ar" text, "type" "public"."job_type_enum" NOT NULL, "sallary" numeric NOT NULL, "description_en" text NOT NULL, "description_ar" text NOT NULL, "featuredImage" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "applicant_job" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "attachment" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "jobId" integer, CONSTRAINT "PK_01c1a3d787e95068afcc1826e45" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "banner" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title_en" character varying(256) NOT NULL, "title_ar" character varying(256) NOT NULL, "page" character varying(256) NOT NULL, "short_description_en" text, "short_description_ar" text, "featuredImage" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_e51addbfb1c9f07d3f0128e5549" UNIQUE ("order"), CONSTRAINT "UQ_c45edba02b3afe81e73908a7ce1" UNIQUE ("page"), CONSTRAINT "PK_6d9e2570b3d85ba37b681cd4256" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "advertisement" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "order" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_name_en" character varying(256) NOT NULL, "company_name_ar" character varying(256) NOT NULL, "page" character varying(256) NOT NULL, "featuredImage" text NOT NULL, "created_by" integer, CONSTRAINT "UQ_13953a60344117314794d443477" UNIQUE ("order"), CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "magazine_categories_category" ("magazineId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_8a00c98c5ef09c8bd2f6fa18918" PRIMARY KEY ("magazineId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f7fc5dfd5499c0dcb24dbbd31e" ON "magazine_categories_category" ("magazineId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_563a82456262b52939bcbaedfb" ON "magazine_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_graduates" ADD CONSTRAINT "FK_a23e466aedaa491159d276db827" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_graduates" ADD CONSTRAINT "FK_91ad48003479cf95784dcee9b14" FOREIGN KEY ("graduateId") REFERENCES "graduates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "graduates" ADD CONSTRAINT "FK_177dcda23cbf26ce3e0ebe65fbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "graduates" ADD CONSTRAINT "FK_84e124fdb96dbff0fac622a5e78" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscribe" ADD CONSTRAINT "FK_0b1a4a90444ae3eeeea4fe5bc9f" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_b560fef39267fc17b04a9e5ccba" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_social" ADD CONSTRAINT "FK_a7e27500b02d13951543bf6d604" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" ADD CONSTRAINT "FK_631c408744a728f29c57fbdd389" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_link" ADD CONSTRAINT "FK_074288b99b0c95837a11f7bfbcc" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_988118bd83e2142884c61a76baa" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patch_graduates" ADD CONSTRAINT "FK_b0fe9eff1db07efb76e63e0f8cd" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "settings" ADD CONSTRAINT "FK_27b4d13068dc326981eafbd7869" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_f5fa2850c506fb7053b1b4f402d" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_041ea7affa4dffcbb4ba297d237" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_c035201790236b56a03073a888a" FOREIGN KEY ("magazineId") REFERENCES "magazine"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_68c078584a67703b28a510583de" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "magazine" ADD CONSTRAINT "FK_2a6992e37a6955b9f029c4f6c02" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD CONSTRAINT "FK_f649315ad7832991a2e2752f206" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_slider" ADD CONSTRAINT "FK_67514f8d3a71011540c3a0d44c2" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallary" ADD CONSTRAINT "FK_1aaf505b4a9ed4eadc5c2f9253e" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer" ADD CONSTRAINT "FK_59c6bbfe193bfc6fe7610ccee8f" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_education" ADD CONSTRAINT "FK_a260459df71654980eaa8f7b409" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_education" ADD CONSTRAINT "FK_2f298fd1083cb3328e726c3ce58" FOREIGN KEY ("educationId") REFERENCES "education"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_accordion" ADD CONSTRAINT "FK_db1a0d1a94c3a8cce759babce0f" FOREIGN KEY ("educationId") REFERENCES "education"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_details" ADD CONSTRAINT "FK_1e0c4d7cd555b1c0183b1d28d64" FOREIGN KEY ("educationId") REFERENCES "education"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "education" ADD CONSTRAINT "FK_8243be7f184414b1baeafcb9589" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultancy_accordion" ADD CONSTRAINT "FK_99840ba52bfc91fd33ebf476a5b" FOREIGN KEY ("consultancyId") REFERENCES "consultancy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultancy" ADD CONSTRAINT "FK_f64763eff3acde40cbf8305d2fb" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job" ADD CONSTRAINT "FK_6614523f381fba2b269e73a04fc" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_job" ADD CONSTRAINT "FK_10303c6b4fe473b3b4df19f108f" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_job" ADD CONSTRAINT "FK_723166b30b86d40d4895253c1c4" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" ADD CONSTRAINT "FK_dbc3d399d579820b6f6ee15dbb4" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" ADD CONSTRAINT "FK_91ab7652d5b52efa66722041dc1" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "magazine_categories_category" ADD CONSTRAINT "FK_f7fc5dfd5499c0dcb24dbbd31e7" FOREIGN KEY ("magazineId") REFERENCES "magazine"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "magazine_categories_category" ADD CONSTRAINT "FK_563a82456262b52939bcbaedfbb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "magazine_categories_category" DROP CONSTRAINT "FK_563a82456262b52939bcbaedfbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "magazine_categories_category" DROP CONSTRAINT "FK_f7fc5dfd5499c0dcb24dbbd31e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisement" DROP CONSTRAINT "FK_91ab7652d5b52efa66722041dc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "banner" DROP CONSTRAINT "FK_dbc3d399d579820b6f6ee15dbb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_job" DROP CONSTRAINT "FK_723166b30b86d40d4895253c1c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_job" DROP CONSTRAINT "FK_10303c6b4fe473b3b4df19f108f"`,
    );
    await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_6614523f381fba2b269e73a04fc"`);
    await queryRunner.query(
      `ALTER TABLE "consultancy" DROP CONSTRAINT "FK_f64763eff3acde40cbf8305d2fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consultancy_accordion" DROP CONSTRAINT "FK_99840ba52bfc91fd33ebf476a5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education" DROP CONSTRAINT "FK_8243be7f184414b1baeafcb9589"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_details" DROP CONSTRAINT "FK_1e0c4d7cd555b1c0183b1d28d64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_accordion" DROP CONSTRAINT "FK_db1a0d1a94c3a8cce759babce0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_education" DROP CONSTRAINT "FK_2f298fd1083cb3328e726c3ce58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_education" DROP CONSTRAINT "FK_a260459df71654980eaa8f7b409"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employer" DROP CONSTRAINT "FK_59c6bbfe193bfc6fe7610ccee8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallary" DROP CONSTRAINT "FK_1aaf505b4a9ed4eadc5c2f9253e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_slider" DROP CONSTRAINT "FK_67514f8d3a71011540c3a0d44c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" DROP CONSTRAINT "FK_f649315ad7832991a2e2752f206"`,
    );
    await queryRunner.query(
      `ALTER TABLE "magazine" DROP CONSTRAINT "FK_2a6992e37a6955b9f029c4f6c02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_68c078584a67703b28a510583de"`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_c035201790236b56a03073a888a"`);
    await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_041ea7affa4dffcbb4ba297d237"`);
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_f5fa2850c506fb7053b1b4f402d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "settings" DROP CONSTRAINT "FK_27b4d13068dc326981eafbd7869"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patch_graduates" DROP CONSTRAINT "FK_b0fe9eff1db07efb76e63e0f8cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_988118bd83e2142884c61a76baa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "social_link" DROP CONSTRAINT "FK_074288b99b0c95837a11f7bfbcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "statistics" DROP CONSTRAINT "FK_631c408744a728f29c57fbdd389"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team_social" DROP CONSTRAINT "FK_a7e27500b02d13951543bf6d604"`,
    );
    await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_b560fef39267fc17b04a9e5ccba"`);
    await queryRunner.query(
      `ALTER TABLE "subscribe" DROP CONSTRAINT "FK_0b1a4a90444ae3eeeea4fe5bc9f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
    await queryRunner.query(
      `ALTER TABLE "graduates" DROP CONSTRAINT "FK_84e124fdb96dbff0fac622a5e78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "graduates" DROP CONSTRAINT "FK_177dcda23cbf26ce3e0ebe65fbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_graduates" DROP CONSTRAINT "FK_91ad48003479cf95784dcee9b14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applicant_graduates" DROP CONSTRAINT "FK_a23e466aedaa491159d276db827"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_563a82456262b52939bcbaedfb"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f7fc5dfd5499c0dcb24dbbd31e"`);
    await queryRunner.query(`DROP TABLE "magazine_categories_category"`);
    await queryRunner.query(`DROP TABLE "advertisement"`);
    await queryRunner.query(`DROP TABLE "banner"`);
    await queryRunner.query(`DROP TABLE "applicant_job"`);
    await queryRunner.query(`DROP TABLE "job"`);
    await queryRunner.query(`DROP TYPE "public"."job_type_enum"`);
    await queryRunner.query(`DROP TABLE "consultancy"`);
    await queryRunner.query(`DROP TABLE "consultancy_accordion"`);
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "education"`);
    await queryRunner.query(`DROP TABLE "education_details"`);
    await queryRunner.query(`DROP TABLE "education_accordion"`);
    await queryRunner.query(`DROP TABLE "applicant_education"`);
    await queryRunner.query(`DROP TABLE "employer"`);
    await queryRunner.query(`DROP TABLE "gallary"`);
    await queryRunner.query(`DROP TABLE "hero_slider"`);
    await queryRunner.query(`DROP TABLE "partner"`);
    await queryRunner.query(`DROP TABLE "magazine"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TYPE "public"."profile_gender_enum"`);
    await queryRunner.query(`DROP TABLE "settings"`);
    await queryRunner.query(`DROP TABLE "patch_graduates"`);
    await queryRunner.query(`DROP TABLE "service"`);
    await queryRunner.query(`DROP TABLE "social_link"`);
    await queryRunner.query(`DROP TABLE "statistics"`);
    await queryRunner.query(`DROP TABLE "team_social"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "subscribe"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(`DROP TABLE "graduates"`);
    await queryRunner.query(`DROP TABLE "applicant_graduates"`);
  }
}
