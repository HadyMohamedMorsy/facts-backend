/**
 * Advertisement interfaces – use these in the frontend for type-safe API responses and forms.
 */

/** Single content item (per language) in advertisement content array */
export interface AdvertisementContentItem {
  company_name: string;
  language_id: number;
}

/** Advertisement entity as returned from API (list, get one, create, update) */
export interface Advertisement {
  id: number;
  content: AdvertisementContentItem[];
  page: string;
  featuredImage: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Payload for creating an advertisement */
export interface CreateAdvertisementDto {
  content: AdvertisementContentItem[];
  page: string;
  featuredImage: string;
}

/** Payload for updating an advertisement (all fields optional except id) */
export interface PatchAdvertisementDto extends Partial<CreateAdvertisementDto> {
  id: number;
}

/** API list response shape */
export interface AdvertisementListResponse {
  data: Advertisement[];
  recordsFiltered?: number;
  totalRecords?: number;
}
