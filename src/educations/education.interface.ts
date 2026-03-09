/**
 * Education interfaces – for use in the frontend.
 */

export interface EducationContentItem {
  title: string;
  intro_description?: string;
  short_description?: string;
  language_id: number;
}

export interface EducationAccordionItem {
  id?: number;
  content: Array<{
    accordion_title: string;
    description: string;
    language_id: number;
  }>;
}

export interface EducationDetailsItem {
  id?: number;
  content: Array<{
    name: string;
    value: string;
    language_id: number;
  }>;
}

export interface Education {
  id: number;
  content: EducationContentItem[];
  slug: string;
  featuredImage: string;
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
  education_accordion?: EducationAccordionItem[];
  education_details?: EducationDetailsItem[];
}

export interface CreateEducationDto {
  content: EducationContentItem[];
  slug: string;
  featuredImage: string;
  thumbnail: string;
  education_accordion?: Array<{
    content: Array<{ accordion_title: string; description: string; language_id: number }>;
  }>;
  education_details?: Array<{
    content: Array<{ name: string; value: string; language_id: number }>;
  }>;
}

export interface PatchEducationDto extends Partial<CreateEducationDto> {
  id: number;
}

export interface EducationListResponse {
  data: Education[];
  recordsFiltered?: number;
  totalRecords?: number;
}
