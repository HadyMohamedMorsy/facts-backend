import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Graduates } from "./graduates.entity";

const getRandomImage = (w = 400, h = 300, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedGraduates(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Graduates);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 2 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 2) {
    console.log("ℹ️  Graduates already seeded.");
    return;
  }

  const data = [
    { slug: "graduate-cert-2024", type: "certification", courseName: "Advanced Diploma", codeCertification: "CERT-2024-001", courses: ["Module A", "Module B"], featuredImage: getRandomImage(400, 300, 110), attachment: getRandomImage(400, 300, 111), imageCertification: getRandomImage(400, 300, 112), dateCourse: "2024-06-01", content: [{ description: "Graduate program 2024", language_id: 1 }, { description: "برنامج الخريجين 2024", language_id: 2 }] },
    { slug: "graduate-cert-2023", type: "certification", courseName: "Professional Course", codeCertification: "CERT-2023-002", courses: ["Module X", "Module Y"], featuredImage: getRandomImage(400, 300, 113), attachment: getRandomImage(400, 300, 114), imageCertification: getRandomImage(400, 300, 115), dateCourse: "2023-12-15", content: [{ description: "Graduate program 2023", language_id: 1 }, { description: "برنامج الخريجين 2023", language_id: 2 }] },
  ].slice(0, 2 - count);

  const entities = repo.create(
    data.map((d, i) => ({ ...d, createdBy: users[0], user: users[i % users.length] })),
  );
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} graduates.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting graduates seeder...");
      await seedGraduates(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Graduates seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding graduates:", error);
      process.exit(1);
    }
  });
}
