import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { PatchGraduates } from "./patch.entity";

export async function seedPatch(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(PatchGraduates);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 3) {
    console.log("ℹ️  Patch graduates already seeded.");
    return;
  }

  const data = [
    { year: "2024", orderIndex: 1, files: ["https://picsum.photos/seed/50/400/300", "https://picsum.photos/seed/51/400/300"], content: [{ name: "Batch 2024", description: "Graduates of 2024", language_id: 1 }, { name: "دفعة 2024", description: "خريجو 2024", language_id: 2 }] },
    { year: "2023", orderIndex: 2, files: ["https://picsum.photos/seed/52/400/300"], content: [{ name: "Batch 2023", description: "Graduates of 2023", language_id: 1 }, { name: "دفعة 2023", description: "خريجو 2023", language_id: 2 }] },
    { year: "2022", orderIndex: 3, files: ["https://picsum.photos/seed/53/400/300", "https://picsum.photos/seed/54/400/300"], content: [{ name: "Batch 2022", description: "Graduates of 2022", language_id: 1 }, { name: "دفعة 2022", description: "خريجو 2022", language_id: 2 }] },
  ].slice(0, 3 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} patch graduates.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting patch seeder...");
      await seedPatch(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Patch seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding patch:", error);
      process.exit(1);
    }
  });
}
