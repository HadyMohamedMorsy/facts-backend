/**
 * Run all seeders in dependency order.
 * Usage: npx ts-node -r tsconfig-paths/register src/seed-runner.ts
 * Or: npm run seed
 */
import { connectionSource } from "../typeorm-cli";
import { seedUsers } from "./users/user.seeder";
import { seedLanguages } from "./language/language.seeder";
import { seedCategories } from "./categories/category.seeder";
import { seedTabs } from "./tab/tab.seeder";
import { seedBanners } from "./banner/banner.seeder";
import { seedContactUs } from "./contact-us/contact-us.seeder";
import { seedHeroSliders } from "./hero-sliders/hero-slider.seeder";
import { seedJobs } from "./jobs/job.seeder";
import { seedMagazines } from "./magazines/magazine.seeder";
import { seedPartners } from "./partners/partner.seeder";
import { seedPatch } from "./patch/patch.seeder";
import { seedProfiles } from "./profile/profile.seeder";
import { seedServicesHome } from "./services-home/service.seeder";
import { seedSocialLinks } from "./social-links/social-link.seeder";
import { seedStatistics } from "./statistics/statistics.seeder";
import { seedSubscribtion } from "./subscribtion/subscribtion.seeder";
import { seedTeam } from "./team/team.seeder";
import { seedConsultancy } from "./consultancy/consultancy.seeder";
import { seedEducations } from "./educations/education.seeder";
import { seedEmployer } from "./employer/employer.seeder";
import { seedGallary } from "./gallary/gallary.seeder";
import { seedGraduates } from "./graduates/graduates.seeder";
import { seedApplicantJobs } from "./applicants-job/applicant-job.seeder";
import { seedApplicantEducations } from "./applicants-education/applicant-education.seeder";
import { seedApplicantGraduates } from "./applicants-graduates/applicant-graduates.seeder";
import { seedGeneralSettings } from "./general-settings/general-settings.seeder";
import { seedBlogs } from "./blogs/blog.seeder";
import { seedAdvertisements } from "./advertisements/advertisement.seeder";

const seeders: Array<{ name: string; fn: (ds: any) => Promise<any> }> = [
  { name: "users", fn: seedUsers },
  { name: "languages", fn: seedLanguages },
  { name: "categories", fn: seedCategories },
  { name: "tabs", fn: seedTabs },
  { name: "banners", fn: seedBanners },
  { name: "contact-us", fn: seedContactUs },
  { name: "hero-sliders", fn: seedHeroSliders },
  { name: "jobs", fn: seedJobs },
  { name: "magazines", fn: seedMagazines },
  { name: "partners", fn: seedPartners },
  { name: "patch", fn: seedPatch },
  { name: "profiles", fn: seedProfiles },
  { name: "services-home", fn: seedServicesHome },
  { name: "social-links", fn: seedSocialLinks },
  { name: "statistics", fn: seedStatistics },
  { name: "subscribtion", fn: seedSubscribtion },
  { name: "team", fn: seedTeam },
  { name: "consultancy", fn: seedConsultancy },
  { name: "educations", fn: seedEducations },
  { name: "employer", fn: seedEmployer },
  { name: "gallary", fn: seedGallary },
  { name: "graduates", fn: seedGraduates },
  { name: "applicant-jobs", fn: seedApplicantJobs },
  { name: "applicant-educations", fn: seedApplicantEducations },
  { name: "applicant-graduates", fn: seedApplicantGraduates },
  { name: "general-settings", fn: seedGeneralSettings },
  { name: "blogs", fn: seedBlogs },
  { name: "advertisements", fn: seedAdvertisements },
];

async function run() {
  await connectionSource.initialize();
  console.log("🌱 Running all seeders...\n");
  for (const { name, fn } of seeders) {
    try {
      await fn(connectionSource);
    } catch (err) {
      console.error(`❌ ${name} failed:`, err);
      throw err;
    }
  }
  await connectionSource.destroy();
  console.log("\n✅ All seeders completed.");
}

run()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌ Seed runner failed:", err);
    process.exit(1);
  });
