import { Role, UserStatus } from "src/shared/enum/global-enum";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";

export async function seedUsers(dataSource: DataSource): Promise<User[]> {
  const userRepository = dataSource.getRepository(User);

  const existing = await userRepository.findOne({ where: { email: "admin@facts.com" } });
  if (existing) {
    console.log("ℹ️  Admin user already exists. Skipping user seed.");
    return userRepository.find({ take: 5 });
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  const admin = userRepository.create({
    firstName: "Admin",
    lastName: "Facts",
    username: "admin",
    email: "admin@facts.com",
    phoneNumber: "0501234567",
    password: hashedPassword,
    birthOfDate: new Date("1990-01-01"),
    role: Role.SUPER_ADMIN,
    type: UserStatus.USER,
    isActive: true,
  });
  await userRepository.save(admin);

  const contentManager = userRepository.create({
    firstName: "Content",
    lastName: "Manager",
    username: "contentmanager",
    email: "content@facts.com",
    phoneNumber: "0507654321",
    password: hashedPassword,
    birthOfDate: new Date("1992-05-15"),
    role: Role.CONTENT_MANAGER,
    type: UserStatus.USER,
    isActive: true,
    createdBy: admin,
  });
  await userRepository.save(contentManager);

  console.log(`✅ Seeded 2 users (admin, content manager).`);
  return [admin, contentManager];
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting user seeder...");
      await seedUsers(connectionSource);
      await connectionSource.destroy();
      console.log("✅ User seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding users:", error);
      process.exit(1);
    }
  });
}
