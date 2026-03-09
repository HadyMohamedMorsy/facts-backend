import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Service } from "./service.entity";

const getRandomImage = (w = 400, h = 300, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedServicesHome(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Service);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 4) {
    console.log("ℹ️  Services (home) already seeded.");
    return;
  }

  const data = [
    { orderIndex: 1, link: "/services/consulting", featuredImage: getRandomImage(400, 300, 60), content: [{ name: "Consulting", language_id: 1 }, { name: "استشارات", language_id: 2 }] },
    { orderIndex: 2, link: "/services/training", featuredImage: getRandomImage(400, 300, 61), content: [{ name: "Training", language_id: 1 }, { name: "تدريب", language_id: 2 }] },
    { orderIndex: 3, link: "/services/development", featuredImage: getRandomImage(400, 300, 62), content: [{ name: "Development", language_id: 1 }, { name: "تطوير", language_id: 2 }] },
    { orderIndex: 4, link: "/services/support", featuredImage: getRandomImage(400, 300, 63), content: [{ name: "Support", language_id: 1 }, { name: "دعم", language_id: 2 }] },
  ].slice(0, 4 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} services (home).`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting services-home seeder...");
      await seedServicesHome(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Services-home seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding services:", error);
      process.exit(1);
    }
  });
}
