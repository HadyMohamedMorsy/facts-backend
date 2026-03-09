/**
 * Statistics interfaces – for use in the frontend.
 */

export interface StatisticsContentItem {
  title?: string;
  language_id: number;
}

export interface Statistics {
  id: number;
  content: StatisticsContentItem[];
  value: number;
  icon: string;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateStatisticsDto {
  content: StatisticsContentItem[];
  value: number;
  icon: string;
  orderIndex?: number;
}

export interface PatchStatisticsDto extends Partial<CreateStatisticsDto> {
  id: number;
}

export interface StatisticsListResponse {
  data: Statistics[];
  recordsFiltered?: number;
  totalRecords?: number;
}
