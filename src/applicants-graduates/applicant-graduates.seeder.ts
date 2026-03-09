import { DataSource } from "typeorm";
import { ApplicantGraduates } from "./applicant-graduates.entity";
import { Graduates } from "src/graduates/graduates.entity";
import { User } from "src/users/user.entity";

export async function seedApplicantGraduates(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(ApplicantGraduates);
  const userRepo = dataSource.getRepository(User);
  const graduatesRepo = dataSource.getRepository(Graduates);

  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const graduates = await graduatesRepo.find({ take: 5 });
  if (graduates.length === 0) {
    console.log("⚠️  No graduates. Run graduates seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 5) {
    console.log("ℹ️  Applicant graduates already seeded.");
    return;
  }

  const createdBy = users[0];
  const toCreate = graduates.slice(0, Math.max(0, 5 - count)).map((graduate, idx) => ({
    createdBy,
    graduate,
    isActive: idx % 2 === 0,
  }));

  const entities = repo.create(toCreate);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} applicant graduates.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting applicant-graduates seeder...");
      await seedApplicantGraduates(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Applicant-graduates seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding applicant-graduates:", error);
      process.exit(1);
    }
  });
}

