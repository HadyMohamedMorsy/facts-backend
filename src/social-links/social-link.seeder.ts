import { SocialPlatform } from "src/shared/enum/social-platform.enum";
import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { SocialLink } from "./social-link.entity";

export async function seedSocialLinks(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(SocialLink);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 4) {
    console.log("ℹ️  Social links already seeded.");
    return;
  }

  const data = [
    { orderIndex: 1, icon: SocialPlatform.FACEBOOK, link: "https://facebook.com/facts" },
    { orderIndex: 2, icon: SocialPlatform.TWITTER, link: "https://twitter.com/facts" },
    { orderIndex: 3, icon: SocialPlatform.INSTAGRAM, link: "https://instagram.com/facts" },
    { orderIndex: 4, icon: SocialPlatform.LINKEDIN, link: "https://linkedin.com/company/facts" },
  ].slice(0, 4 - count);

  const entities = repo.create(data.map(d => ({ ...d, createdBy: users[0] })));
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} social links.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting social-links seeder...");
      await seedSocialLinks(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Social-links seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding social links:", error);
      process.exit(1);
    }
  });
}
