import { TYPE } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Job } from "./job.entity";

const getRandomImage = (w = 800, h = 500, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedJobs(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Job);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 4) {
    console.log("ℹ️  Jobs already seeded.");
    return;
  }

  const data = [
    {
      type: TYPE.FULLTIME,
      salary: 8000,
      featuredImage: getRandomImage(800, 500, 20),
      content: [
        { title: "Senior Developer", short_description: "Full stack", description: "We need a senior developer.", language_id: 1 },
        { title: "مطور أول", short_description: "فول ستاك", description: "نبحث عن مطور أول.", language_id: 2 },
      ],
    },
    {
      type: TYPE.PARTTIME,
      salary: 4000,
      featuredImage: getRandomImage(800, 500, 21),
      content: [
        { title: "Content Writer", short_description: "Part time", description: "Content writing role.", language_id: 1 },
        { title: "كاتب محتوى", short_description: "جزء من الوقت", description: "دور كتابة المحتوى.", language_id: 2 },
      ],
    },
    {
      type: TYPE.FULLTIME,
      salary: 6000,
      featuredImage: getRandomImage(800, 500, 22),
      content: [
        { title: "Designer", short_description: "UI/UX", description: "UI/UX designer needed.", language_id: 1 },
        { title: "مصمم", short_description: "واجهات وتجربة مستخدم", description: "مطلوب مصمم واجهات.", language_id: 2 },
      ],
    },
    {
      type: TYPE.PARTTIME,
      salary: 3500,
      featuredImage: getRandomImage(800, 500, 23),
      content: [
        { title: "Marketing Specialist", short_description: "Digital", description: "Marketing and social media.", language_id: 1 },
        { title: "أخصائي تسويق", short_description: "رقمي", description: "التسويق ووسائل التواصل.", language_id: 2 },
      ],
    },
  ].slice(0, 4 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} jobs.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting job seeder...");
      await seedJobs(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Job seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding jobs:", error);
      process.exit(1);
    }
  });
}
