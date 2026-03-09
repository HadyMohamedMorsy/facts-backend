import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { GeneralSettings } from "./general-settings.entity";

const defaultContentItem = (lang: number, name: string, title: string) => ({
  store_name: name,
  maintenance_message: "We are back soon.",
  store_address: "Riyadh, Saudi Arabia",
  meta_title: title,
  meta_favicon: "https://picsum.photos/seed/fav/32/32",
  logo: "https://picsum.photos/seed/logo/200/60",
  meta_description: "Facts - Your trusted partner.",
  meta_keywords: "facts, consulting, services",
  meta_author: "Facts",
  meta_robots: "index, follow",
  meta_canonical: "https://facts.com",
  meta_image: "https://picsum.photos/seed/og/1200/630",
  meta_og_title: title,
  meta_og_description: "Facts - Your trusted partner.",
  meta_og_image: "https://picsum.photos/seed/og/1200/630",
  meta_og_url: "https://facts.com",
  meta_og_type: "website",
  meta_og_locale: lang === 1 ? "en_US" : "ar_SA",
  meta_og_site_name: name,
  language_id: lang,
});

export async function seedGeneralSettings(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(GeneralSettings);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await repo.count();
  if (count >= 1) {
    console.log("ℹ️  General settings already seeded.");
    return;
  }

  const entity = repo.create({
    content: [defaultContentItem(1, "Facts", "Facts | Home"), defaultContentItem(2, "فاكتس", "فاكتس | الرئيسية")],
    store_email: "info@facts.com",
    store_phone: "0501234567",
    createdBy: users[0],
  });
  await repo.save(entity);
  console.log("✅ Seeded general settings.");
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting general-settings seeder...");
      await seedGeneralSettings(connectionSource);
      await connectionSource.destroy();
      console.log("✅ General-settings seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding general settings:", error);
      process.exit(1);
    }
  });
}
