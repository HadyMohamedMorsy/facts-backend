/**
 * Testimonials interfaces – for use in the frontend.
 */

export interface TestimonialContentItem {
  name?: string;
  position?: string;
  quote?: string;
  language_id: number;
}

export interface Testimonial {
  id: number;
  content: TestimonialContentItem[];
  featuredImage: string;
  rating: number;
  orderIndex?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: { id: number; firstName?: string; lastName?: string; email?: string };
}

export interface CreateTestimonialDto {
  content: TestimonialContentItem[];
  featuredImage?: string;
  rating?: number;
  orderIndex?: number;
  isActive?: boolean;
}

export interface PatchTestimonialDto extends Partial<CreateTestimonialDto> {
  id: number;
}

export interface TestimonialListResponse {
  data: Testimonial[];
  recordsFiltered?: number;
  totalRecords?: number;
}
