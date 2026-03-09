import { DataSource } from "typeorm";
import { Education } from "./education.entity";

const getRandomImage = (w = 600, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedEducations(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Education);
  const slugs = ["course-basics", "course-advanced", "course-pro"];
  const existing = await repo.find({ where: slugs.map(s => ({ slug: s })) });
  const existingSlugs = new Set(existing.map(e => e.slug));
  const toCreate = slugs.filter(s => !existingSlugs.has(s));
  if (toCreate.length === 0) {
    console.log("ℹ️  Educations already seeded.");
    return;
  }

  const data = [
    { slug: "course-basics", featuredImage: getRandomImage(600, 400, 90), thumbnail: getRandomImage(300, 200, 91), content: [{ title: "Basics Course", short_description: "Introduction", intro_description: "Get started", language_id: 1 }, { title: "دورة الأساسيات", short_description: "مقدمة", intro_description: "ابدأ معنا", language_id: 2 }] },
    { slug: "course-advanced", featuredImage: getRandomImage(600, 400, 92), thumbnail: getRandomImage(300, 200, 93), content: [{ title: "Advanced Course", short_description: "Deep dive", intro_description: "Next level", language_id: 1 }, { title: "دورة متقدمة", short_description: "تعمق", intro_description: "المستوى التالي", language_id: 2 }] },
    { slug: "course-pro", featuredImage: getRandomImage(600, 400, 94), thumbnail: getRandomImage(300, 200, 95), content: [{ title: "Pro Course", short_description: "Expert level", intro_description: "For professionals", language_id: 1 }, { title: "دورة احترافية", short_description: "مستوى خبير", intro_description: "للمحترفين", language_id: 2 }] },
  ].filter(d => toCreate.includes(d.slug));

  const entities = repo.create(data);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} educations.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting educations seeder...");
      await seedEducations(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Educations seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding educations:", error);
      process.exit(1);
    }
  });
}
