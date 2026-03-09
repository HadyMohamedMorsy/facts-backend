import { Gender } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Profile } from "./profile.entity";

export async function seedProfiles(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Profile);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 3) {
    console.log("ℹ️  Profiles already seeded.");
    return;
  }

  const data = [
    { firstName: "Ahmed", lastName: "Ali", age: "28", gender: Gender.MALE, country: "Saudi Arabia", phoneNumber: "0501111001", experience: "5 years", skills: ["JavaScript", "Angular", "Node.js"], facebook: "https://facebook.com/ahmed" },
    { firstName: "Sara", lastName: "Mohammed", age: "26", gender: Gender.FEMALE, country: "Egypt", phoneNumber: "0502222002", experience: "3 years", skills: ["Design", "UI/UX"], achievements: "Best designer 2023" },
    { firstName: "Omar", lastName: "Hassan", age: "30", gender: Gender.MALE, country: "UAE", phoneNumber: "0503333003", experience: "7 years", skills: ["Management", "Strategy"] },
  ].slice(0, 3 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} profiles.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting profile seeder...");
      await seedProfiles(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Profile seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding profiles:", error);
      process.exit(1);
    }
  });
}
