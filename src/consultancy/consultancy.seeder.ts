import { DataSource } from "typeorm";
import { Consultancy } from "./consultancy.entity";

const getRandomImage = (w = 600, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedConsultancy(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Consultancy);
  const slugs = ["strategy", "digital", "management"];
  const existing = await repo.find({ where: slugs.map(s => ({ slug: s })) });
  const existingSlugs = new Set(existing.map(c => c.slug));
  const toCreate = slugs.filter(s => !existingSlugs.has(s));
  if (toCreate.length === 0) {
    console.log("ℹ️  Consultancy already seeded.");
    return;
  }

  const data = [
    { slug: "strategy", featuredImage: getRandomImage(600, 400, 80), content: [{ title: "Strategy Consulting", short_description: "Business strategy", language_id: 1 }, { title: "استشارات استراتيجية", short_description: "استراتيجية الأعمال", language_id: 2 }] },
    { slug: "digital", featuredImage: getRandomImage(600, 400, 81), content: [{ title: "Digital Transformation", short_description: "Digital solutions", language_id: 1 }, { title: "التحول الرقمي", short_description: "حلول رقمية", language_id: 2 }] },
    { slug: "management", featuredImage: getRandomImage(600, 400, 82), content: [{ title: "Management Consulting", short_description: "Operations & management", language_id: 1 }, { title: "استشارات إدارية", short_description: "العمليات والإدارة", language_id: 2 }] },
  ].filter(d => toCreate.includes(d.slug));

  const entities = repo.create(data);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} consultancy entries.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting consultancy seeder...");
      await seedConsultancy(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Consultancy seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding consultancy:", error);
      process.exit(1);
    }
  });
}
