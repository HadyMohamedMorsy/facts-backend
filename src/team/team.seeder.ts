import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Team } from "./team.entity";
import { TeamSocial } from "./team-social.entity";

const getRandomImage = (w = 400, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedTeam(dataSource: DataSource): Promise<void> {
  const teamRepo = dataSource.getRepository(Team);
  const socialRepo = dataSource.getRepository(TeamSocial);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await teamRepo.count();
  if (count >= 3) {
    console.log("ℹ️  Team already seeded.");
    return;
  }

  const teamData = [
    { orderIndex: 1, featuredImage: getRandomImage(400, 400, 70), phoneNumber: ["0501111000"], content: [{ name: "Ahmed CEO", position: "CEO", description: "Founder and CEO", language_id: 1 }, { name: "أحمد المدير", position: "الرئيس التنفيذي", description: "المؤسس والرئيس التنفيذي", language_id: 2 }] },
    { orderIndex: 2, featuredImage: getRandomImage(400, 400, 71), phoneNumber: ["0502222000"], content: [{ name: "Sara Manager", position: "Operations Manager", description: "Operations lead", language_id: 1 }, { name: "سارة المديرة", position: "مديرة العمليات", description: "قائدة العمليات", language_id: 2 }] },
    { orderIndex: 3, featuredImage: getRandomImage(400, 400, 72), phoneNumber: ["0503333000"], content: [{ name: "Omar Lead", position: "Tech Lead", description: "Technical lead", language_id: 1 }, { name: "عمر التقني", position: "قائد تقني", description: "القائد التقني", language_id: 2 }] },
  ].slice(0, 3 - count);

  const teams = teamRepo.create(teamData.map(d => ({ ...d, createdBy: users[0] })));
  await teamRepo.save(teams);

  const socialsData = [
    { icon: "facebook", link: "https://facebook.com" },
    { icon: "linkedin", link: "https://linkedin.com" },
  ];
  for (const team of teams) {
    const socials = socialRepo.create(socialsData.map(s => ({ ...s, team })));
    await socialRepo.save(socials);
  }

  console.log(`✅ Seeded ${teams.length} team members with social links.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting team seeder...");
      await seedTeam(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Team seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding team:", error);
      process.exit(1);
    }
  });
}
