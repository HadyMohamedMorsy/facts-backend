import { DataSource } from "typeorm";
import { Contact } from "./contact-us.entity";

export async function seedContactUs(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Contact);
  const count = await repo.count();
  if (count >= 3) {
    console.log("ℹ️  Contact us already seeded.");
    return;
  }

  const data = [
    { email: "info@facts.com", fullName: "Ahmed Ali", subject: "General Inquiry", phoneNumber: "0501111111", message: "Hello, I would like more information." },
    { email: "support@facts.com", fullName: "Sara Mohammed", subject: "Support", phoneNumber: "0502222222", message: "Need help with my account." },
    { email: "sales@facts.com", fullName: "Omar Hassan", subject: "Partnership", phoneNumber: "0503333333", message: "Interested in partnership." },
  ].slice(0, 3 - count);

  const entities = repo.create(data);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} contact entries.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting contact-us seeder...");
      await seedContactUs(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Contact-us seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding contact-us:", error);
      process.exit(1);
    }
  });
}
