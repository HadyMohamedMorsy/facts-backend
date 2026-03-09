import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Job } from "src/jobs/job.entity";

export class CreateApplicantJobDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  createdBy: number;

  @IsString()
  @IsNotEmpty()
  attachment: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  job: Job;
}
