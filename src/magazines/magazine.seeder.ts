import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Magazine } from "./magazine.entity";

const getRandomImage = (w = 600, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedMagazines(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Magazine);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 3) {
    console.log("ℹ️  Magazines already seeded.");
    return;
  }

  const data = [
    { slug: "magazine-issue-1", orderIndex: 1, featuredImage: getRandomImage(600, 800, 30), publicationDate: "2024-01-15", content: [{ title: "Issue 1", short_description: "First edition", language_id: 1 }, { title: "العدد 1", short_description: "الإصدار الأول", language_id: 2 }] },
    { slug: "magazine-issue-2", orderIndex: 2, featuredImage: getRandomImage(600, 800, 31), publicationDate: "2024-02-15", content: [{ title: "Issue 2", short_description: "Second edition", language_id: 1 }, { title: "العدد 2", short_description: "الإصدار الثاني", language_id: 2 }] },
    { slug: "magazine-issue-3", orderIndex: 3, featuredImage: getRandomImage(600, 800, 32), publicationDate: "2024-03-15", content: [{ title: "Issue 3", short_description: "Third edition", language_id: 1 }, { title: "العدد 3", short_description: "الإصدار الثالث", language_id: 2 }] },
  ].slice(0, 3 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} magazines.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting magazine seeder...");
      await seedMagazines(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Magazine seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding magazines:", error);
      process.exit(1);
    }
  });
}
