import { DataSource } from "typeorm";
import { Banner } from "./banner.entity";

const getRandomImage = (w = 600, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedBanners(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Banner);
  const pages = ["home", "about", "contact"];
  const existing = await repo.find({ where: pages.map(p => ({ page: p })) });
  const existingPages = new Set(existing.map(b => b.page));
  const toCreate = pages.filter(p => !existingPages.has(p));
  if (toCreate.length === 0) {
    console.log("ℹ️  Banners already seeded.");
    return;
  }

  const data: Array<{ page: string; content: any[]; featuredImage: string }> = [
    {
      page: "home",
      featuredImage: getRandomImage(1920, 600, 1),
      content: [
        { title: "Welcome Home", short_description: "Discover our services", language_id: 1 },
        { title: "مرحباً بك", short_description: "اكتشف خدماتنا", language_id: 2 },
      ],
    },
    {
      page: "about",
      featuredImage: getRandomImage(1920, 600, 2),
      content: [
        { title: "About Us", short_description: "Who we are", language_id: 1 },
        { title: "من نحن", short_description: "تعرف علينا", language_id: 2 },
      ],
    },
    {
      page: "contact",
      featuredImage: getRandomImage(1920, 600, 3),
      content: [
        { title: "Contact", short_description: "Get in touch", language_id: 1 },
        { title: "اتصل بنا", short_description: "تواصل معنا", language_id: 2 },
      ],
    },
  ].filter(d => toCreate.includes(d.page));

  const entities = repo.create(data);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} banners.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting banner seeder...");
      await seedBanners(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Banner seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding banners:", error);
      process.exit(1);
    }
  });
}
