import { CreateBannerDto } from "src/banner/dtos/create-banner.dto";
import { CreateConsultancyDto } from "src/consultancy/dtos/create-consultancy.dto";
import { CreateEducationsDto } from "src/educations/dtos/create-educations.dto";
import { CreateHeroSliderDto } from "src/hero-sliders/dtos/create-hero-slider.dto";
import { CreatePartnersDto } from "src/partners/dtos/create-partners.dto";
import { CreateStatisticsDto } from "src/statistics/dtos/create-statistics.dto";
import { CreateTeamDto } from "src/team/dtos/create-team.dto";

const APIVERSION = "/api/v1";

export const dtoMappings = {
  [`${APIVERSION}/consultancy/store`]: CreateConsultancyDto,
  [`${APIVERSION}/consultancy/store-upload`]: CreateConsultancyDto,
  [`${APIVERSION}/consultancy/store-uploads`]: CreateConsultancyDto,
  [`${APIVERSION}/education/store`]: CreateEducationsDto,
  [`${APIVERSION}/education/store-upload`]: CreateEducationsDto,
  [`${APIVERSION}/education/store-uploads`]: CreateEducationsDto,
  [`${APIVERSION}/team/store`]: CreateTeamDto,
  [`${APIVERSION}/team/store-upload`]: CreateTeamDto,
  [`${APIVERSION}/team/store-uploads`]: CreateTeamDto,
  [`${APIVERSION}/partner/store`]: CreatePartnersDto,
  [`${APIVERSION}/partner/store-upload`]: CreatePartnersDto,
  [`${APIVERSION}/partner/store-uploads`]: CreatePartnersDto,
  [`${APIVERSION}/slider/store`]: CreateHeroSliderDto,
  [`${APIVERSION}/slider/store-upload`]: CreateHeroSliderDto,
  [`${APIVERSION}/slider/store-uploads`]: CreateHeroSliderDto,
  [`${APIVERSION}/banner/store`]: CreateBannerDto,
  [`${APIVERSION}/banner/store-upload`]: CreateBannerDto,
  [`${APIVERSION}/banner/store-uploads`]: CreateBannerDto,
  [`${APIVERSION}/statistics/store`]: CreateStatisticsDto,
  [`${APIVERSION}/statistics/store-upload`]: CreateStatisticsDto,
  [`${APIVERSION}/statistics/store-uploads`]: CreateStatisticsDto,
};
