import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Employer } from "./employer.entity";

export async function seedEmployer(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Employer);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 2) {
    console.log("ℹ️  Employers already seeded.");
    return;
  }

  const data = [
    { companyName: "Tech Solutions Ltd", businessType: "Technology", industry: "IT", companyAddress: "Riyadh, Saudi Arabia", companyPhone: "0501111000", companyEmail: "info@techsolutions.com", websiteUrl: "https://techsolutions.com", isActive: true },
    { companyName: "Innovation Co", businessType: "Consulting", industry: "Consulting", companyAddress: "Jeddah, Saudi Arabia", companyPhone: "0502222000", companyEmail: "contact@innovation.com", websiteUrl: "https://innovation.com", isActive: true },
  ].slice(0, 2 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} employers.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting employer seeder...");
      await seedEmployer(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Employer seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding employers:", error);
      process.exit(1);
    }
  });
}
