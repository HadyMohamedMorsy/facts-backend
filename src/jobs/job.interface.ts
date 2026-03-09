/**
 * Job interfaces – for use in the frontend.
 */

export type JobType = "part_time" | "full_time";

export interface JobContentItem {
  title?: string;
  short_description?: string;
  description?: string;
  language_id: number;
}

export interface Job {
  id: number;
  content: JobContentItem[];
  type: JobType;
  salary: number;
  featuredImage: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateJobDto {
  content: JobContentItem[];
  type: JobType;
  salary: number;
  featuredImage: string;
}

export interface PatchJobDto extends Partial<CreateJobDto> {
  id: number;
}

export interface JobListResponse {
  data: Job[];
  recordsFiltered?: number;
  totalRecords?: number;
}
