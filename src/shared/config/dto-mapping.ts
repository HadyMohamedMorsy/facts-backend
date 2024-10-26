import { CreatAdvertisementDto } from "src/advertisements/dtos/create-advertisements.dto";
import { CreateApplicantJobstDto } from "src/applicants-job/dtos/create-applicants-job";
import { PatchApplicantJobsDto } from "src/applicants-job/dtos/patch-applicants-job.dto";
import { CreateBannerDto } from "src/banner/dtos/create-banner.dto";
import { PatchBannerDto } from "src/banner/dtos/patch-banner.dto";
import { CreateBlogsDto } from "src/blogs/dto/create-blogs-blogs.dto";
import { PatchBlogDto } from "src/blogs/dto/patch-blog.dto";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";
import { PatchCategoryDto } from "src/categories/dto/patch-category.dto";
import { CreateConsultancyDto } from "src/consultancy/dtos/create-consultancy.dto";
import { PatchConsultancyDto } from "src/consultancy/dtos/patch-consultancy.dto";
import { CreateEducationsDto } from "src/educations/dtos/create-educations.dto";
import { PatchEducationDto } from "src/educations/dtos/patch-education.dto";
import { CreateGallarysDto } from "src/gallary/dtos/create-gallary.dto";
import { PatchGallaryDto } from "src/gallary/dtos/patch-gallary.dto";
import { CreateGraduatestDto } from "src/graduates/dtos/create-graduates";
import { PatchGraduatesDto } from "src/graduates/dtos/patch-graduates.dto";
import { CreateHeroSliderDto } from "src/hero-sliders/dtos/create-hero-slider.dto";
import { PatchPostDto } from "src/hero-sliders/dtos/patch-consultancy.dto";
import { CreateJobDto } from "src/jobs/dtos/create-job.dto";
import { PatchJobDto } from "src/jobs/dtos/patch-job.dto";
import { CreateMagazineDto } from "src/magazines/dto/create-magazine.dto";
import { PatchMagazineDto } from "src/magazines/dto/patch-magazine.dto";
import { CreatePartnersDto } from "src/partners/dtos/create-partners.dto";
import { PatchPartnerDto } from "src/partners/dtos/patch-partners.dto";
import { CreatePatchDto } from "src/patch/dtos/create-patch.dto";
import { PatchPatchDto } from "src/patch/dtos/patch-patch.dto";
import { PatchServiceDto } from "src/services-home/dto/patch-service.dto";
import { CreateServiceDto } from "src/services-home/dto/service.dto";
import { CreateSettingDto } from "src/settings/dtos/create-setting.dto";
import { patchSettingDto } from "src/settings/dtos/patch-setting.dto";
import { CreateSocialLinkDto } from "src/social-links/dtos/create-social-link";
import { PatchSocialLinkDto } from "src/social-links/dtos/patch-social-link.dto";
import { CreateStatisticsDto } from "src/statistics/dtos/create-statistics.dto";
import { PatchStatisticsDto } from "src/statistics/dtos/patch-statistics.dto";
import { CreateTeamDto } from "src/team/dtos/create-team.dto";
import { PatchTeamDto } from "src/team/dtos/patch-team.dto";

const APIVERSION = "/api/v1";

export const dtoMappings = {
  [`${APIVERSION}/consultancy/store`]: CreateConsultancyDto,
  [`${APIVERSION}/consultancy/update`]: PatchConsultancyDto,
  [`${APIVERSION}/education/store`]: CreateEducationsDto,
  [`${APIVERSION}/education/update`]: PatchEducationDto,
  [`${APIVERSION}/team/store`]: CreateTeamDto,
  [`${APIVERSION}/team/update`]: PatchTeamDto,
  [`${APIVERSION}/partner/store`]: CreatePartnersDto,
  [`${APIVERSION}/partner/update`]: PatchPartnerDto,
  [`${APIVERSION}/slider/store`]: CreateHeroSliderDto,
  [`${APIVERSION}/slider/update`]: PatchPostDto,
  [`${APIVERSION}/banner/store`]: CreateBannerDto,
  [`${APIVERSION}/banner/update`]: PatchBannerDto,
  [`${APIVERSION}/statistics/store`]: CreateStatisticsDto,
  [`${APIVERSION}/statistics/update`]: PatchStatisticsDto,
  [`${APIVERSION}/gallary/store`]: CreateGallarysDto,
  [`${APIVERSION}/gallary/update`]: PatchGallaryDto,
  [`${APIVERSION}/category/store`]: CreateCategoryDto,
  [`${APIVERSION}/category/update`]: PatchCategoryDto,
  [`${APIVERSION}/job/store`]: CreateJobDto,
  [`${APIVERSION}/job/update`]: PatchJobDto,
  [`${APIVERSION}/job/store/front`]: CreateJobDto,
  [`${APIVERSION}/magazine/store`]: CreateMagazineDto,
  [`${APIVERSION}/magazine/update`]: PatchMagazineDto,
  [`${APIVERSION}/graduates/store`]: CreateGraduatestDto,
  [`${APIVERSION}/graduates/update`]: PatchGraduatesDto,
  [`${APIVERSION}/graduates/store/front`]: CreateGraduatestDto,
  [`${APIVERSION}/graduates/update/front`]: PatchGraduatesDto,
  [`${APIVERSION}/blog/store`]: CreateBlogsDto,
  [`${APIVERSION}/blog/update`]: PatchBlogDto,
  [`${APIVERSION}/setting/store`]: CreateSettingDto,
  [`${APIVERSION}/setting/update`]: patchSettingDto,
  [`${APIVERSION}/patch/store`]: CreatePatchDto,
  [`${APIVERSION}/patch/update`]: PatchPatchDto,
  [`${APIVERSION}/service-home/store`]: CreateServiceDto,
  [`${APIVERSION}/service-home/update`]: PatchServiceDto,
  [`${APIVERSION}/social-link/store`]: CreateSocialLinkDto,
  [`${APIVERSION}/social-link/update`]: PatchSocialLinkDto,
  [`${APIVERSION}/applicant-Job/store/front`]: CreateApplicantJobstDto,
  [`${APIVERSION}/applicant-Job/update/front`]: PatchApplicantJobsDto,
  [`${APIVERSION}/advertisement/store`]: CreatAdvertisementDto,
  [`${APIVERSION}/advertisement/update`]: CreatAdvertisementDto,
};
