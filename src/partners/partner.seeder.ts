import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Partner } from "./partner.entity";

const getRandomImage = (w = 200, h = 100, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedPartners(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Partner);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 4) {
    console.log("ℹ️  Partners already seeded.");
    return;
  }

  const data = [
    { orderIndex: 1, link: "https://example.com/partner1", featuredImage: getRandomImage(200, 100, 40), content: [{ title: "Partner One", description: "Strategic partner", language_id: 1 }, { title: "الشريك الأول", description: "شريك استراتيجي", language_id: 2 }] },
    { orderIndex: 2, link: "https://example.com/partner2", featuredImage: getRandomImage(200, 100, 41), content: [{ title: "Partner Two", description: "Technology partner", language_id: 1 }, { title: "الشريك الثاني", description: "شريك تقني", language_id: 2 }] },
    { orderIndex: 3, link: "https://example.com/partner3", featuredImage: getRandomImage(200, 100, 42), content: [{ title: "Partner Three", description: "Business partner", language_id: 1 }, { title: "الشريك الثالث", description: "شريك أعمال", language_id: 2 }] },
    { orderIndex: 4, link: "https://example.com/partner4", featuredImage: getRandomImage(200, 100, 43), content: [{ title: "Partner Four", description: "Innovation partner", language_id: 1 }, { title: "الشريك الرابع", description: "شريك ابتكار", language_id: 2 }] },
  ].slice(0, 4 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} partners.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting partner seeder...");
      await seedPartners(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Partner seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding partners:", error);
      process.exit(1);
    }
  });
}
