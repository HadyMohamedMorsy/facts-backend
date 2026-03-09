/**
 * Applicant-Job interfaces – for use in the frontend with the applicants-job API.
 */

/** Applicant-Job as returned from API */
export interface ApplicantJob {
  id: number;
  jobId?: number;
  isActive: boolean;
  attachment: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
  job?: { id: number; [key: string]: any };
}

/** Payload for creating an applicant-job (send jobId + attachment; createdBy set from auth) */
export interface CreateApplicantJobDto {
  jobId: number;
  attachment: string;
  isActive?: boolean;
}

/** Payload for updating (all fields optional except id) */
export interface PatchApplicantJobDto extends Partial<CreateApplicantJobDto> {
  id: number;
}

export interface ApplicantJobListResponse {
  data: ApplicantJob[];
  recordsFiltered?: number;
  totalRecords?: number;
}
