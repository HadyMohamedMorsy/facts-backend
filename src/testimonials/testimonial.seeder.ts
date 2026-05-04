import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { Testimonial } from "./testimonial.entity";

const getRandomImage = (w = 400, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

type SeedTestimonial = Pick<
  Testimonial,
  "orderIndex" | "featuredImage" | "rating" | "isActive" | "content"
>;

export async function seedTestimonials(dataSource: DataSource): Promise<void> {
  const testimonialRepo = dataSource.getRepository(Testimonial);
  const userRepo = dataSource.getRepository(User);

  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const count = await testimonialRepo.count();
  if (count >= 3) {
    console.log("ℹ️  Testimonials already seeded.");
    return;
  }

  const testimonialsData: SeedTestimonial[] = [
    {
      orderIndex: 1,
      rating: 5,
      isActive: true,
      featuredImage: getRandomImage(420, 420, 301),
      content: [
        {
          name: "Mona Hassan",
          position: "Personal Trainer",
          quote:
            "FACTS gave me practical tools I could apply with clients from the first week. The confidence and structure I gained changed my coaching results.",
          language_id: 1,
        },
        {
          name: "منى حسن",
          position: "مدربة شخصية",
          quote:
            "FACTS أعطتني أدوات عملية أطبقها مع العملاء من أول أسبوع. الثقة والتنظيم اللي اكتسبتهم فرقوا جدًا في نتائج تدريبي.",
          language_id: 2,
        },
      ],
    },
    {
      orderIndex: 2,
      rating: 5,
      isActive: true,
      featuredImage: getRandomImage(420, 420, 302),
      content: [
        {
          name: "Karim Ali",
          position: "Gym Manager",
          quote:
            "The academy standards and hands-on assessments made hiring decisions easier for our facility. Graduates are ready to perform.",
          language_id: 1,
        },
        {
          name: "كريم علي",
          position: "مدير صالة رياضية",
          quote:
            "معايير الأكاديمية والتقييمات العملية سهلت قرارات التوظيف عندنا. الخريجين جاهزين للشغل من أول يوم.",
          language_id: 2,
        },
      ],
    },
    {
      orderIndex: 3,
      rating: 4,
      isActive: true,
      featuredImage: getRandomImage(420, 420, 303),
      content: [
        {
          name: "Nour El-Deen",
          position: "Strength Coach",
          quote:
            "From program design to communication skills, the journey was complete. I now deliver sessions with clear plans and measurable progress.",
          language_id: 1,
        },
        {
          name: "نور الدين",
          position: "مدرب قوة",
          quote:
            "من تصميم البرامج لأسلوب التواصل، الرحلة كانت متكاملة. دلوقتي بقدم حصص بخطط واضحة ونتائج قابلة للقياس.",
          language_id: 2,
        },
      ],
    },
  ].slice(0, 3 - count);

  const records = testimonialRepo.create(
    testimonialsData.map(item => ({
      ...item,
      createdBy: users[0],
    })),
  );
  await testimonialRepo.save(records);
  console.log(`✅ Seeded ${records.length} testimonials.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting testimonials seeder...");
      await seedTestimonials(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Testimonials seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding testimonials:", error);
      process.exit(1);
    }
  });
}
