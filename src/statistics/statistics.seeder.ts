import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Statistics } from "./statistics.entity";

export async function seedStatistics(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Statistics);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 4) {
    console.log("ℹ️  Statistics already seeded.");
    return;
  }

  const data = [
    { orderIndex: 1, value: 150, icon: "users", content: [{ title: "Happy Clients", language_id: 1 }, { title: "عميل سعيد", language_id: 2 }] },
    { orderIndex: 2, value: 50, icon: "projects", content: [{ title: "Projects Done", language_id: 1 }, { title: "مشروع منجز", language_id: 2 }] },
    { orderIndex: 3, value: 10, icon: "years", content: [{ title: "Years Experience", language_id: 1 }, { title: "سنوات خبرة", language_id: 2 }] },
    { orderIndex: 4, value: 25, icon: "awards", content: [{ title: "Awards Won", language_id: 1 }, { title: "جائزة", language_id: 2 }] },
  ].slice(0, 4 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} statistics.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting statistics seeder...");
      await seedStatistics(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Statistics seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding statistics:", error);
      process.exit(1);
    }
  });
}
