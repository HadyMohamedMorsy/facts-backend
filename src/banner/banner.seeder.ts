import { DataSource } from "typeorm";
import { BannerPage } from "src/shared/enum/banner-page.enum";
import { Banner } from "./banner.entity";

const getRandomImage = (w = 600, h = 400, seed?: number) =>
  `https://picsum.photos/seed/${seed ?? Math.floor(Math.random() * 1000) + 1}/${w}/${h}`;

export async function seedBanners(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Banner);
  const pages: BannerPage[] = [
    BannerPage.Home,
    BannerPage.About,
    BannerPage.Blogs,
    BannerPage.Consultancy,
    BannerPage.ConsultancyDetails,
    BannerPage.Contact,
    BannerPage.Education,
    BannerPage.EducationDetails,
    BannerPage.Gallary,
    BannerPage.Job,
    BannerPage.JoinPage,
    BannerPage.Magazine,
    BannerPage.Team,
  ];
  const existing = await repo.find({ where: pages.map(p => ({ page: p })) });
  const existingPages = new Set(existing.map(b => b.page));
  const toCreate = pages.filter(p => !existingPages.has(p));
  if (toCreate.length === 0) {
    console.log("ℹ️  Banners already seeded.");
    return;
  }

  const data: Array<{ page: BannerPage; content: any[]; featuredImage: string }> = [
    {
      page: BannerPage.Home,
      featuredImage: getRandomImage(1920, 600, 1),
      content: [
        { title: "Welcome Home", short_description: "Discover our services", language_id: 1 },
        { title: "مرحباً بك", short_description: "اكتشف خدماتنا", language_id: 2 },
      ],
    },
    {
      page: BannerPage.About,
      featuredImage: getRandomImage(1920, 600, 2),
      content: [
        { title: "About Us", short_description: "Who we are", language_id: 1 },
        { title: "من نحن", short_description: "تعرف علينا", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Blogs,
      featuredImage: getRandomImage(1920, 600, 3),
      content: [
        { title: "Blogs", short_description: "Read our latest articles", language_id: 1 },
        { title: "المدونات", short_description: "اقرأ أحدث مقالاتنا", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Consultancy,
      featuredImage: getRandomImage(1920, 600, 4),
      content: [
        { title: "Consultancy", short_description: "Expert advisory services", language_id: 1 },
        { title: "الاستشارات", short_description: "خدمات استشارية متخصصة", language_id: 2 },
      ],
    },
    {
      page: BannerPage.ConsultancyDetails,
      featuredImage: getRandomImage(1920, 600, 5),
      content: [
        { title: "Consultancy Details", short_description: "Service details and benefits", language_id: 1 },
        { title: "تفاصيل الاستشارة", short_description: "تفاصيل الخدمة وفوائدها", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Contact,
      featuredImage: getRandomImage(1920, 600, 6),
      content: [
        { title: "Contact", short_description: "Get in touch", language_id: 1 },
        { title: "اتصل بنا", short_description: "تواصل معنا", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Education,
      featuredImage: getRandomImage(1920, 600, 7),
      content: [
        { title: "Educations", short_description: "Discover our courses", language_id: 1 },
        { title: "البرامج التعليمية", short_description: "اكتشف دوراتنا", language_id: 2 },
      ],
    },
    {
      page: BannerPage.EducationDetails,
      featuredImage: getRandomImage(1920, 600, 8),
      content: [
        { title: "Course Details", short_description: "Full course information", language_id: 1 },
        { title: "تفاصيل الدورة", short_description: "معلومات كاملة عن الدورة", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Gallary,
      featuredImage: getRandomImage(1920, 600, 9),
      content: [
        { title: "Gallary", short_description: "Moments from our academy", language_id: 1 },
        { title: "المعرض", short_description: "لحظات من الأكاديمية", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Job,
      featuredImage: getRandomImage(1920, 600, 10),
      content: [
        { title: "Jobs", short_description: "Find your next opportunity", language_id: 1 },
        { title: "الوظائف", short_description: "ابحث عن فرصتك القادمة", language_id: 2 },
      ],
    },
    {
      page: BannerPage.JoinPage,
      featuredImage: getRandomImage(1920, 600, 11),
      content: [
        { title: "Join Us", short_description: "Be part of FACTS Academy", language_id: 1 },
        { title: "انضم إلينا", short_description: "كن جزءاً من أكاديمية FACTS", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Magazine,
      featuredImage: getRandomImage(1920, 600, 12),
      content: [
        { title: "Magazine", short_description: "Insights & stories", language_id: 1 },
        { title: "مجلة", short_description: "رؤى وقصص", language_id: 2 },
      ],
    },
    {
      page: BannerPage.Team,
      featuredImage: getRandomImage(1920, 600, 13),
      content: [
        { title: "Team", short_description: "Meet our experts", language_id: 1 },
        { title: "الفريق", short_description: "تعرّف على خبرائنا", language_id: 2 },
      ],
    },
  ].filter(d => toCreate.includes(d.page));

  const entities = repo.create(data);
  await repo.save(entities);
  console.log(`✅ Seeded ${entities.length} banners.`);
}

if (require.main === module) {
  import("../../typeorm-cli").then(async ({ connectionSource }) => {
    try {
      await connectionSource.initialize();
      console.log("📦 Starting banner seeder...");
      await seedBanners(connectionSource);
      await connectionSource.destroy();
      console.log("✅ Banner seeder completed!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error seeding banners:", error);
      process.exit(1);
    }
  });
}
