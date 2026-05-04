import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ConsultancyAccordion } from "./consultancy-accordion.entity";
import { Consultancy } from "./consultancy.entity";
import { CreateConsultancyDto } from "./dtos/create-consultancy.dto";
import { PatchConsultancyDto } from "./dtos/patch-consultancy.dto";

@Injectable()
export class ConsultancyService
  extends BaseService<Consultancy, CreateConsultancyDto, PatchConsultancyDto>
  implements ICrudService<Consultancy, CreateConsultancyDto, PatchConsultancyDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Consultancy)
    repository: Repository<Consultancy>,
    @InjectRepository(ConsultancyAccordion)
    private readonly accordionRepository: Repository<ConsultancyAccordion>,
  ) {
    super(repository, apiFeaturesService);
  }

  protected override queryRelationIndex(
    queryBuilder?: SelectQueryBuilder<Consultancy>,
    filteredRecord?: any,
  ) {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    if (!queryBuilder) return;

    queryBuilder
      .leftJoin("e.consultancy_accordion", "consultancyAccordion")
      .addSelect(["consultancyAccordion.id", "consultancyAccordion.content"]);
  }

  override async create(
    createDto: CreateConsultancyDto,
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<Consultancy> {
    const { consultancy_accordion, ...consultancyData } = createDto;
    const consultancy = await this.repository.save(
      this.repository.create({
        content: consultancyData.content,
        slug: consultancyData.slug,
        featuredImage: consultancyData.featuredImage,
      }),
    );
    if (consultancy_accordion?.length) {
      const accordions = consultancy_accordion.map(item =>
        this.accordionRepository.create({
          content: item.content,
          consultancy,
        }),
      );
      await this.accordionRepository.save(accordions);
    }
    return this.findOne(consultancy.id, selectOptions, relations);
  }

  override async update(
    updateDto: PatchConsultancyDto & { id: number },
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<Consultancy> {
    const { consultancy_accordion, id, ...consultancyData } = updateDto;
    await this.repository.update(id, consultancyData as any);
    if (consultancy_accordion !== undefined) {
      await this.accordionRepository
        .createQueryBuilder()
        .delete()
        .where("consultancyId = :id", { id })
        .execute();
      if (consultancy_accordion.length > 0) {
        const consultancy = await this.repository.findOne({ where: { id } });
        if (consultancy) {
          const accordions = consultancy_accordion.map(item =>
            this.accordionRepository.create({
              content: item.content,
              consultancy,
            }),
          );
          await this.accordionRepository.save(accordions);
        }
      }
    }
    return this.findOne(id, selectOptions, relations);
  }

  async findBySlug(slug: string) {
    const consultancy = await this.repository.findOne({
      where: { slug },
      relations: ["consultancy_accordion"],
    });
    if (!consultancy) {
      throw new NotFoundException(`Consultancy with slug '${slug}' not found`);
    }
    return { data: consultancy };
  }
}
