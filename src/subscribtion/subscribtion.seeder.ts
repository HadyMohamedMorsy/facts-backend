import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Subscribe } from "./subscribtion.entity";

export async function seedSubscribtion(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Subscribe);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 3) {
    console.log("ℹ️  Subscriptions already seeded.");
    return;
  }

  const data = [
    { emailSubscribe: "newsletter@example.com", type: "newsletter", isActive: true },
    { emailSubscribe: "updates@example.com", type: "updates", isActive: true },
    { emailSubscribe: "promo@example.com", type: "promo", isActive: false },
  ].slice(0, 3 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} subscriptions.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting subscribtion seeder...");
      await seedSubscribtion(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Subscribtion seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding subscriptions:", error);
      process.exit(1);
    }
  });
}
