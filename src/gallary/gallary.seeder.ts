import { Tab } from "src/tab/tab.entity";
import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Gallary } from "./gallary.entity";

export async function seedGallary(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Gallary);
  const userRepo = dataSource.getRepository(User);
  const tabRepo = dataSource.getRepository(Tab);
  const users = await userRepo.find({ take: 1 });
  const tabs = await tabRepo.find({ take: 3 });
  if (users.length === 0 || tabs.length === 0) {
    console.log("⚠️  Need users and tabs. Run user and tab seeders first.");
    return;
  }

  const count = await repo.count();
  if (count >= 4) {
    console.log("ℹ️  Gallery already seeded.");
    return;
  }

  const data = [
    { orderIndex: 1, tab: tabs[0], files: ["https://picsum.photos/seed/100/800/600", "https://picsum.photos/seed/101/800/600"], content: [{ accordion_title: "Event 1", language_id: 1 }, { accordion_title: "فعالية 1", language_id: 2 }] },
    { orderIndex: 2, tab: tabs[0], files: ["https://picsum.photos/seed/102/800/600"], content: [{ accordion_title: "Event 2", language_id: 1 }, { accordion_title: "فعالية 2", language_id: 2 }] },
    { orderIndex: 3, tab: tabs[1] ?? tabs[0], files: ["https://picsum.photos/seed/103/800/600", "https://picsum.photos/seed/104/800/600"], content: [{ accordion_title: "Gallery Item", language_id: 1 }, { accordion_title: "عنصر المعرض", language_id: 2 }] },
    { orderIndex: 4, tab: tabs[1] ?? tabs[0], files: ["https://picsum.photos/seed/105/800/600"], content: [{ accordion_title: "Another Item", language_id: 1 }, { accordion_title: "عنصر آخر", language_id: 2 }] },
  ].slice(0, 4 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} gallery items.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting gallary seeder...");
      await seedGallary(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Gallary seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding gallary:", error);
      process.exit(1);
    }
  });
}
