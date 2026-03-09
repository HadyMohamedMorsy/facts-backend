/**
 * Consultancy interfaces – for use in the frontend.
 */

export interface ConsultancyContentItem {
  title: string;
  short_description?: string;
  language_id: number;
}

export interface ConsultancyAccordionItem {
  id?: number;
  content: Array<{
    accordion_title: string;
    description: string;
    language_id: number;
  }>;
}

export interface Consultancy {
  id: number;
  content: ConsultancyContentItem[];
  slug: string;
  featuredImage: string;
  createdAt?: string;
  updatedAt?: string;
  consultancy_accordion?: ConsultancyAccordionItem[];
}

export interface CreateConsultancyDto {
  content: ConsultancyContentItem[];
  slug: string;
  featuredImage: string;
  consultancy_accordion?: Array<{
    content: Array<{ accordion_title: string; description: string; language_id: number }>;
  }>;
}

export interface PatchConsultancyDto extends Partial<CreateConsultancyDto> {
  id: number;
}

export interface ConsultancyListResponse {
  data: Consultancy[];
  recordsFiltered?: number;
  totalRecords?: number;
}
