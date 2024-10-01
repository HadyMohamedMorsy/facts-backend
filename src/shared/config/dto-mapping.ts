import { CreateBannerDto } from "src/banner/dtos/create-banner.dto";
import { PatchBannerDto } from "src/banner/dtos/patch-banner.dto";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";
import { PatchCategoryDto } from "src/categories/dto/patch-category.dto";
import { CreateConsultancyDto } from "src/consultancy/dtos/create-consultancy.dto";
import { PatchConsultancyDto } from "src/consultancy/dtos/patch-consultancy.dto";
import { CreateEducationsDto } from "src/educations/dtos/create-educations.dto";
import { PatchEducationDto } from "src/educations/dtos/patch-education.dto";
import { CreateGallarysDto } from "src/gallary/dtos/create-gallary.dto";
import { PatchGallaryDto } from "src/gallary/dtos/patch-gallary.dto";
import { CreateHeroSliderDto } from "src/hero-sliders/dtos/create-hero-slider.dto";
import { PatchPostDto } from "src/hero-sliders/dtos/patch-consultancy.dto";
import { CreatePartnersDto } from "src/partners/dtos/create-partners.dto";
import { PatchPartnerDto } from "src/partners/dtos/patch-partners.dto";
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
};
