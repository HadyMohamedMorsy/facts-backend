import { CreateConsultancyDto } from "src/consultancy/dtos/create-consultancy.dto";

const APIVERSION = "/api/v1";

export const dtoMappings = {
  [`${APIVERSION}/consultancy/store`]: CreateConsultancyDto,
  [`${APIVERSION}/consultancy/store-upload`]: CreateConsultancyDto,
  [`${APIVERSION}/consultancy/store-uploads`]: CreateConsultancyDto,
};
