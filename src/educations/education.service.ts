import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateEducationDto } from "./dtos/create-education.dto";
import { PatchEducationDto } from "./dtos/patch-education.dto";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationDetails } from "./education-details.entity";
import { Education } from "./education.entity";

@Injectable()
export class EducationService
  extends BaseService<Education, CreateEducationDto, PatchEducationDto>
  implements ICrudService<Education, CreateEducationDto, PatchEducationDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Education)
    repository: Repository<Education>,
    @InjectRepository(EducationAccordion)
    private readonly accordionRepository: Repository<EducationAccordion>,
    @InjectRepository(EducationDetails)
    private readonly detailsRepository: Repository<EducationDetails>,
  ) {
    super(repository, apiFeaturesService);
  }

  protected override queryRelationIndex(
    queryBuilder?: SelectQueryBuilder<Education>,
    filteredRecord?: any,
  ) {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    if (!queryBuilder) return;

    queryBuilder
      .leftJoin("e.education_accordion", "educationAccordion")
      .addSelect(["educationAccordion.id", "educationAccordion.content"])
      .leftJoin("e.education_details", "educationDetails")
      .addSelect(["educationDetails.id", "educationDetails.content"]);
  }

  override async create(
    createDto: CreateEducationDto,
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<Education> {
    const { education_accordion, education_details, ...educationData } = createDto;
    const education = await this.repository.save(
      this.repository.create({
        content: educationData.content,
        slug: educationData.slug,
        featuredImage: educationData.featuredImage,
        thumbnail: educationData.thumbnail,
        courseFile: educationData.courseFile,
        advisorContactLink: educationData.advisorContactLink,
        education_topics: educationData.education_topics,
      }),
    );
    if (education_accordion?.length) {
      const accordions = education_accordion.map(item =>
        this.accordionRepository.create({ content: item.content, education }),
      );
      await this.accordionRepository.save(accordions);
    }
    if (education_details?.length) {
      const details = education_details.map(item =>
        this.detailsRepository.create({ content: item.content, education }),
      );
      await this.detailsRepository.save(details);
    }
    return this.findOne(education.id, selectOptions, relations);
  }

  override async update(
    updateDto: PatchEducationDto & { id: number },
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<Education> {
    const { education_accordion, education_details, id, ...educationData } = updateDto;
    await this.repository.update(id, educationData as any);
    if (education_accordion !== undefined) {
      await this.accordionRepository
        .createQueryBuilder()
        .delete()
        .where("educationId = :id", { id })
        .execute();
      if (education_accordion.length > 0) {
        const education = await this.repository.findOne({ where: { id } });
        if (education) {
          const accordions = education_accordion.map(item =>
            this.accordionRepository.create({ content: item.content, education }),
          );
          await this.accordionRepository.save(accordions);
        }
      }
    }
    if (education_details !== undefined) {
      await this.detailsRepository
        .createQueryBuilder()
        .delete()
        .where("educationId = :id", { id })
        .execute();
      if (education_details.length > 0) {
        const education = await this.repository.findOne({ where: { id } });
        if (education) {
          const details = education_details.map(item =>
            this.detailsRepository.create({ content: item.content, education }),
          );
          await this.detailsRepository.save(details);
        }
      }
    }
    return this.findOne(id, selectOptions, relations);
  }

  async findBySlug(slug: string) {
    const education = await this.repository.findOne({
      where: { slug },
      relations: ["education_accordion", "education_details"],
    });
    if (!education) {
      throw new NotFoundException(`Education with slug '${slug}' not found`);
    }
    return { data: education };
  }
}
