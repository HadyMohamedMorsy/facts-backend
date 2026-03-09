import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Language } from "./language.entity";

export async function seedLanguages(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Language);
  const userRepo = dataSource.getRepository(User);

  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users found. Run user seeder first.");
    return;
  }

  const existing = await repo.count();
  if (existing >= 2) {
    console.log("ℹ️  Languages already seeded.");
    return;
  }

  const items = [
    { name: "English" },
    { name: "العربية" },
  ];

  const entities = repo.create(
    items.map((item, i) => ({ ...item, createdBy: users[i % users.length] })),
  );
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} languages.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting language seeder...");
      await seedLanguages(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Language seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding languages:", error);
      process.exit(1);
    }
  });
}
