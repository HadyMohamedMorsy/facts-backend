import { User } from "src/users/user.entity";
import { DataSource } from "typeorm";
import { GeneralSettings } from "./general-settings.entity";

const defaultContentItem = (lang: number, name: string, title: string) => ({
  store_name: name,
  maintenance_message: "We are back soon.",
  store_address: "Riyadh, Saudi Arabia",
  marker: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  marker_link: "https://maps.google.com/?q=Riyadh,Saudi+Arabia",
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
  vission:
    lang === 1
      ? "To be the leading partner in providing innovative solutions and consulting services."
      : "أن نكون الشريك الرائد في تقديم الحلول المبتكرة وخدمات الاستشارات.",
  vission_image: "https://picsum.photos/seed/vision/800/500",
  mission:
    lang === 1
      ? "To empower our clients with strategic insights and excellence in execution."
      : "تمكين عملائنا بالرؤى الاستراتيجية والتميز في التنفيذ.",
  mission_image: "https://picsum.photos/seed/mission/800/500",
  about_facts:
    lang === 1
      ? "Facts is your trusted partner for innovative solutions and consulting services."
      : "فاكتس شريكك الموثوق للحلول المبتكرة وخدمات الاستشارات.",
  about_facts_image: "https://picsum.photos/seed/about/800/500",
  facts_slider_content:
    lang === 1
      ? "Welcome to Facts - Your trusted partner for innovative solutions."
      : "مرحباً بكم في فاكتس - شريككم الموثوق للحلول المبتكرة.",
  statistics_eyebrow: "",
  statistics_title: "",
  statistics_subtitle: "",
  statistics_kicker: "",
  team_intro: "",
  about_feat_1_l1: lang === 1 ? "IT'S NOT JUST EFFORT." : "ليس مجهودًا فقط.",
  about_feat_1_l2: lang === 1 ? "IT'S SCIENCE." : "إنه علم.",
  about_feat_1_body:
    lang === 1
      ? "Every FACTS program is built on evidence and hands-on practice."
      : "كل برنامج في FACTS مبني على الأدلة والتطبيق العملي.",
  about_feat_1_image: "assets/media/about/about-image.jpg",
  about_feat_2_l1: lang === 1 ? "OUR MISSION" : "مهمتنا",
  about_feat_2_l2: lang === 1 ? "IS YOUR GROWTH." : "هي نموك.",
  about_feat_2_body:
    lang === 1
      ? "We help turn ambition into outcomes through training and consultancy."
      : "نحوّل الطموح إلى نتائج عبر التدريب والاستشارات.",
  about_feat_2_image: "assets/media/about/IMG_5363.jpg",
  about_feat_3_l1: lang === 1 ? "VISION WITH" : "رؤية",
  about_feat_3_l2: lang === 1 ? "CLARITY." : "بوضوح.",
  about_feat_3_body:
    lang === 1
      ? "Clear standards and measurable outcomes for real readiness."
      : "معايير واضحة ونتائج قابلة للقياس لجاهزية حقيقية.",
  about_feat_3_image: "assets/media/about/IMG_5403.jpg",
  about_feat_4_l1: lang === 1 ? "TRUST BUILT ON" : "ثقة مبنية على",
  about_feat_4_l2: lang === 1 ? "STANDARDS." : "معايير.",
  about_feat_4_body:
    lang === 1
      ? "Recognized frameworks guide our quality and delivery."
      : "أطر معترف بها تقود الجودة والتنفيذ لدينا.",
  about_feat_4_image: "assets/media/about/vision.JPG",
  management_feat_1_l1: lang === 1 ? "LEADERSHIP WITH" : "قيادة",
  management_feat_1_l2: lang === 1 ? "PURPOSE." : "بهدف.",
  management_feat_1_body:
    lang === 1
      ? "Our management approach aligns people, standards, and outcomes."
      : "نهجنا الإداري يربط بين الأشخاص والمعايير والنتائج.",
  management_feat_1_image: "assets/media/about/about-image.jpg",
  management_feat_2_l1: lang === 1 ? "SYSTEMS THAT" : "أنظمة",
  management_feat_2_l2: lang === 1 ? "SUPPORT SCALE." : "تدعم التوسع.",
  management_feat_2_body:
    lang === 1
      ? "Clear governance helps teams deliver consistently across programs."
      : "الحوكمة الواضحة تساعد الفرق على تقديم أداء ثابت عبر البرامج.",
  management_feat_2_image: "assets/media/about/IMG_5363.jpg",
  management_feat_3_l1: lang === 1 ? "DECISIONS BUILT" : "قرارات مبنية",
  management_feat_3_l2: lang === 1 ? "ON INSIGHT." : "على الرؤية.",
  management_feat_3_body:
    lang === 1
      ? "We use data and field experience to guide operational decisions."
      : "نستخدم البيانات والخبرة الميدانية لتوجيه القرارات التشغيلية.",
  management_feat_3_image: "assets/media/about/IMG_5403.jpg",
  management_feat_4_l1: lang === 1 ? "ACCOUNTABILITY IN" : "مسؤولية في",
  management_feat_4_l2: lang === 1 ? "EVERY STEP." : "كل خطوة.",
  management_feat_4_body:
    lang === 1
      ? "Performance, quality, and follow-through are managed as one discipline."
      : "تتم إدارة الأداء والجودة والمتابعة كمنهج واحد.",
  management_feat_4_image: "assets/media/about/vision.JPG",
});

export async function seedGeneralSettings(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(GeneralSettings);
  const userRepo = dataSource.getRepository(User);
  const users = await userRepo.find({ take: 1 });
  if (users.length === 0) {
    console.log("⚠️  No users. Run user seeder first.");
    return;
  }

  const existing = await repo.find({ take: 1 });
  if (existing.length === 0) {
    const entity = repo.create({
      content: [
        defaultContentItem(1, "Facts", "Facts | Home"),
        defaultContentItem(2, "فاكتس", "فاكتس | الرئيسية"),
      ],
      store_email: "info@facts.com",
      store_phone: "0501234567",
      createdBy: users[0],
    });
    await repo.save(entity);
    console.log("✅ Seeded general settings.");
  } else {
    // Update existing record if content items lack vission/mission/about_facts
    const settings = existing[0];
    const content = JSON.parse(JSON.stringify(settings.content || []));
    const defaultEn = defaultContentItem(1, "Facts", "Facts | Home");
    const defaultAr = defaultContentItem(2, "فاكتس", "فاكتس | الرئيسية");
    const defaults: Record<number, typeof defaultEn> = { 1: defaultEn, 2: defaultAr };
    let updated = false;
    for (let i = 0; i < content.length; i++) {
      const item = content[i];
      const def = defaults[item.language_id] || defaultEn;
      const needsUpdate =
        item.vission == null ||
        item.vission_image == null ||
        item.mission == null ||
        item.mission_image == null ||
        item.about_facts == null ||
        item.about_facts_image == null ||
        item.marker == null ||
        item.marker_link == null ||
        item.facts_slider_content == null ||
        item.statistics_eyebrow == null ||
        item.statistics_title == null ||
        item.statistics_subtitle == null ||
        item.statistics_kicker == null ||
        item.team_intro == null ||
        item.about_feat_1_l1 == null ||
        item.about_feat_1_l2 == null ||
        item.about_feat_1_body == null ||
        item.about_feat_1_image == null ||
        item.about_feat_2_l1 == null ||
        item.about_feat_2_l2 == null ||
        item.about_feat_2_body == null ||
        item.about_feat_2_image == null ||
        item.about_feat_3_l1 == null ||
        item.about_feat_3_l2 == null ||
        item.about_feat_3_body == null ||
        item.about_feat_3_image == null ||
        item.about_feat_4_l1 == null ||
        item.about_feat_4_l2 == null ||
        item.about_feat_4_body == null ||
        item.about_feat_4_image == null ||
        item.management_feat_1_l1 == null ||
        item.management_feat_1_l2 == null ||
        item.management_feat_1_body == null ||
        item.management_feat_1_image == null ||
        item.management_feat_2_l1 == null ||
        item.management_feat_2_l2 == null ||
        item.management_feat_2_body == null ||
        item.management_feat_2_image == null ||
        item.management_feat_3_l1 == null ||
        item.management_feat_3_l2 == null ||
        item.management_feat_3_body == null ||
        item.management_feat_3_image == null ||
        item.management_feat_4_l1 == null ||
        item.management_feat_4_l2 == null ||
        item.management_feat_4_body == null ||
        item.management_feat_4_image == null;
      if (needsUpdate) {
        content[i] = {
          ...item,
          vission: item.vission ?? def.vission,
          vission_image: item.vission_image ?? def.vission_image,
          mission: item.mission ?? def.mission,
          mission_image: item.mission_image ?? def.mission_image,
          about_facts: item.about_facts ?? def.about_facts ?? "",
          about_facts_image: item.about_facts_image ?? def.about_facts_image ?? "",
          marker: item.marker ?? def.marker ?? "",
          marker_link: item.marker_link ?? def.marker_link ?? "",
          facts_slider_content: item.facts_slider_content ?? def.facts_slider_content ?? "",
          statistics_eyebrow: item.statistics_eyebrow ?? def.statistics_eyebrow ?? "",
          statistics_title: item.statistics_title ?? def.statistics_title ?? "",
          statistics_subtitle: item.statistics_subtitle ?? def.statistics_subtitle ?? "",
          statistics_kicker: item.statistics_kicker ?? def.statistics_kicker ?? "",
          team_intro: item.team_intro ?? def.team_intro ?? "",
          about_feat_1_l1: item.about_feat_1_l1 ?? def.about_feat_1_l1 ?? "",
          about_feat_1_l2: item.about_feat_1_l2 ?? def.about_feat_1_l2 ?? "",
          about_feat_1_body: item.about_feat_1_body ?? def.about_feat_1_body ?? "",
          about_feat_1_image: item.about_feat_1_image ?? def.about_feat_1_image ?? "",
          about_feat_2_l1: item.about_feat_2_l1 ?? def.about_feat_2_l1 ?? "",
          about_feat_2_l2: item.about_feat_2_l2 ?? def.about_feat_2_l2 ?? "",
          about_feat_2_body: item.about_feat_2_body ?? def.about_feat_2_body ?? "",
          about_feat_2_image: item.about_feat_2_image ?? def.about_feat_2_image ?? "",
          about_feat_3_l1: item.about_feat_3_l1 ?? def.about_feat_3_l1 ?? "",
          about_feat_3_l2: item.about_feat_3_l2 ?? def.about_feat_3_l2 ?? "",
          about_feat_3_body: item.about_feat_3_body ?? def.about_feat_3_body ?? "",
          about_feat_3_image: item.about_feat_3_image ?? def.about_feat_3_image ?? "",
          about_feat_4_l1: item.about_feat_4_l1 ?? def.about_feat_4_l1 ?? "",
          about_feat_4_l2: item.about_feat_4_l2 ?? def.about_feat_4_l2 ?? "",
          about_feat_4_body: item.about_feat_4_body ?? def.about_feat_4_body ?? "",
          about_feat_4_image: item.about_feat_4_image ?? def.about_feat_4_image ?? "",
          management_feat_1_l1: item.management_feat_1_l1 ?? def.management_feat_1_l1 ?? "",
          management_feat_1_l2: item.management_feat_1_l2 ?? def.management_feat_1_l2 ?? "",
          management_feat_1_body:
            item.management_feat_1_body ?? def.management_feat_1_body ?? "",
          management_feat_1_image:
            item.management_feat_1_image ?? def.management_feat_1_image ?? "",
          management_feat_2_l1: item.management_feat_2_l1 ?? def.management_feat_2_l1 ?? "",
          management_feat_2_l2: item.management_feat_2_l2 ?? def.management_feat_2_l2 ?? "",
          management_feat_2_body:
            item.management_feat_2_body ?? def.management_feat_2_body ?? "",
          management_feat_2_image:
            item.management_feat_2_image ?? def.management_feat_2_image ?? "",
          management_feat_3_l1: item.management_feat_3_l1 ?? def.management_feat_3_l1 ?? "",
          management_feat_3_l2: item.management_feat_3_l2 ?? def.management_feat_3_l2 ?? "",
          management_feat_3_body:
            item.management_feat_3_body ?? def.management_feat_3_body ?? "",
          management_feat_3_image:
            item.management_feat_3_image ?? def.management_feat_3_image ?? "",
          management_feat_4_l1: item.management_feat_4_l1 ?? def.management_feat_4_l1 ?? "",
          management_feat_4_l2: item.management_feat_4_l2 ?? def.management_feat_4_l2 ?? "",
          management_feat_4_body:
            item.management_feat_4_body ?? def.management_feat_4_body ?? "",
          management_feat_4_image:
            item.management_feat_4_image ?? def.management_feat_4_image ?? "",
        };
        updated = true;
      }
    }
    if (updated) {
      settings.content = content;
      await repo.save(settings);
      console.log("✅ Updated general settings with vission/mission/about_facts fields.");
    } else {
      console.log("ℹ️  General settings already up to date.");
    }
  }
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
