/**
 * Subscribe (Subscribtion) interfaces – for use in the frontend.
 */

export interface Subscribe {
  id: number;
  emailSubscribe: string;
  type: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateSubscribeDto {
  emailSubscribe: string;
  type: string;
}

export interface PatchSubscribeDto extends Partial<CreateSubscribeDto> {
  id: number;
}

export interface SubscribeListResponse {
  data: Subscribe[];
  recordsFiltered?: number;
  totalRecords?: number;
}
