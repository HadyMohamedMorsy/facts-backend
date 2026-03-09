import { DataSource } from "typeorm";
import { ApplicantJob } from "./applicant-job.entity";
import { Job } from "src/jobs/job.entity";
import { User } from "src/users/user.entity";

const getRandomAttachment = (seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/1200/800`;

export async function seedApplicantJobs(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(ApplicantJob);
  const userRepo = dataSource.getRepository(User);
  const jobRepo = dataSource.getRepository(Job);

  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const jobs = await jobRepo.find({ take: 5 });
  if (jobs.length === 0) {
    console.log("⚠️  No jobs. Run job seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 5) {
    console.log("ℹ️  Applicant jobs already seeded.");
    return;
  }

  const createdBy = users[0];
  const toCreate = jobs.slice(0, Math.max(0, 5 - count)).map((job, idx) => ({
    createdBy,
    job,
    isActive: idx % 2 === 0,
    attachment: getRandomAttachment(310 + idx),
  }));

  const entities = repo.create(toCreate);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} applicant jobs.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting applicant-job seeder...");
      await seedApplicantJobs(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Applicant-job seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding applicant-job:", error);
      process.exit(1);
    }
  });
}

