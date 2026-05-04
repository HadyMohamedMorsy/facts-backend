import { DataSource, In } from "typeorm";
import { Advertisement } from "./advertisement.entity";

const getRandomImage = (w = 600, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

type SeedAdvertisement = Pick<Advertisement, "page" | "featuredImage" | "content" | "link">;

export async function seedAdvertisements(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Advertisement);

  const pages = ["Job", "Magazine", "ConsultancyDetails", "EducationDetails", "BlogDetails"];
  const existing = await repo.find({ where: { page: In(pages) } });
  const existingKeys = new Set(existing.map(a => `${a.page}:${a.featuredImage}`));

  const data: SeedAdvertisement[] = [
    {
      page: "Job",
      link: "https://example.com/jobs",
      featuredImage: getRandomImage(900, 600, 201),
      content: [
        { company_name: "ACME Hiring", language_id: 1 },
        { company_name: "أكمي للتوظيف", language_id: 2 },
      ],
    },
    {
      page: "Job",
      link: "https://example.com/careers",
      featuredImage: getRandomImage(900, 600, 202),
      content: [
        { company_name: "CareerBoost", language_id: 1 },
        { company_name: "كارير بوست", language_id: 2 },
      ],
    },
    {
      page: "Magazine",
      link: "https://example.com/magazine",
      featuredImage: getRandomImage(900, 600, 211),
      content: [
        { company_name: "Readers Club", language_id: 1 },
        { company_name: "نادي القرّاء", language_id: 2 },
      ],
    },
    {
      page: "Magazine",
      link: "https://example.com/insights",
      featuredImage: getRandomImage(900, 600, 212),
      content: [
        { company_name: "Insight Media", language_id: 1 },
        { company_name: "إنسايت ميديا", language_id: 2 },
      ],
    },
    {
      page: "ConsultancyDetails",
      link: "https://example.com/consultancy",
      featuredImage: getRandomImage(900, 600, 221),
      content: [
        { company_name: "ProConsult", language_id: 1 },
        { company_name: "برو كونسلت", language_id: 2 },
      ],
    },
    {
      page: "EducationDetails",
      link: "https://example.com/education",
      featuredImage: getRandomImage(900, 600, 231),
      content: [
        { company_name: "LearnHub", language_id: 1 },
        { company_name: "ليرن هَب", language_id: 2 },
      ],
    },
    {
      page: "BlogDetails",
      link: "https://example.com/blog",
      featuredImage: getRandomImage(900, 600, 241),
      content: [
        { company_name: "Tech Digest", language_id: 1 },
        { company_name: "تك دايجست", language_id: 2 },
      ],
    },
  ];

  // Insert only new records (idempotent-ish)
  const toInsert = data.filter(d => !existingKeys.has(`${d.page}:${d.featuredImage}`));

  if (toInsert.length === 0) {
    console.log("ℹ️  Advertisements already seeded.");
    return;
  }

  const entities = repo.create(toInsert);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} advertisements.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting advertisement seeder...");
      await seedAdvertisements(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Advertisement seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding advertisements:", error);
      process.exit(1);
    }
  });
}
