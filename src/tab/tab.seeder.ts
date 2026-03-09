import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Tab } from "./tab.entity";

export async function seedTabs(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Tab);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const slugs = ["news", "gallery", "about"];
  const existing = await repo.find({ where: slugs.map(s => ({ slug: s })) });
  const existingSlugs = new Set(existing.map(t => t.slug));
  const toCreate = slugs.filter(s => !existingSlugs.has(s));
  if (toCreate.length === 0) {
    console.log("ℹ️  Tabs already seeded.");
    return;
  }

  const data: Array<{ slug: string; orderIndex: number; content: any[] }> = [
    { slug: "news", orderIndex: 1, content: [{ title: "News", language_id: 1 }, { title: "أخبار", language_id: 2 }] },
    { slug: "gallery", orderIndex: 2, content: [{ title: "Gallery", language_id: 1 }, { title: "معرض", language_id: 2 }] },
    { slug: "about", orderIndex: 3, content: [{ title: "About", language_id: 1 }, { title: "من نحن", language_id: 2 }] },
  ].filter(d => toCreate.includes(d.slug));

  const entities = repo.create(
    data.map((d, i) => ({ ...d, createdBy: users[i % users.length] })),
  );
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} tabs.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting tab seeder...");
      await seedTabs(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Tab seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding tabs:", error);
      process.exit(1);
    }
  });
}
