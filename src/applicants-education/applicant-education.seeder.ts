import { DataSource } from "typeorm";
import { ApplicantEducation } from "./applicant-education.entity";
import { Education } from "src/educations/education.entity";
import { User } from "src/users/user.entity";

export async function seedApplicantEducations(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(ApplicantEducation);
  const userRepo = dataSource.getRepository(User);
  const educationRepo = dataSource.getRepository(Education);

  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const educations = await educationRepo.find({ take: 5 });
  if (educations.length === 0) {
    console.log("⚠️  No educations. Run education seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 5) {
    console.log("ℹ️  Applicant educations already seeded.");
    return;
  }

  const createdBy = users[0];
  const toCreate = educations.slice(0, Math.max(0, 5 - count)).map((education, idx) => ({
    createdBy,
    education,
    isActive: idx % 2 === 0,
  }));

  const entities = repo.create(toCreate);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} applicant educations.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting applicant-education seeder...");
      await seedApplicantEducations(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Applicant-education seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding applicant-education:", error);
      process.exit(1);
    }
  });
}

