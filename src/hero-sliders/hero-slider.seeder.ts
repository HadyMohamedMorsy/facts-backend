import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { HeroSlider } from "./hero-slider.entity";

const getRandomImage = (w = 1200, h = 500, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedHeroSliders(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(HeroSlider);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 3) {
    console.log("ℹ️  Hero sliders already seeded.");
    return;
  }

  const data = [
    { orderIndex: 1, content: [{ title: "Welcome to Facts", short_description: "Your trusted partner", language_id: 1 }, { title: "مرحباً بكم في فاكتس", short_description: "شريككم الموثوق", language_id: 2 }], featuredImage: getRandomImage(1200, 500, 10), video: null, type: "image" as const },
    { orderIndex: 2, content: [{ title: "Quality Services", short_description: "We deliver excellence", language_id: 1 }, { title: "خدمات متميزة", short_description: "نقدم التميز", language_id: 2 }], featuredImage: getRandomImage(1200, 500, 11), video: null, type: "image" as const },
    { orderIndex: 3, content: [{ title: "Get Started Today", short_description: "Contact us now", language_id: 1 }, { title: "ابدأ اليوم", short_description: "تواصل معنا", language_id: 2 }], featuredImage: getRandomImage(1200, 500, 12), video: null, type: "image" as const },
  ].slice(0, 3 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} hero sliders.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting hero-slider seeder...");
      await seedHeroSliders(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Hero-slider seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding hero sliders:", error);
      process.exit(1);
    }
  });
}
