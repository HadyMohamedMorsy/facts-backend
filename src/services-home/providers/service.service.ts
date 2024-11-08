// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { BaseService } from "src/shared/common/base/base.service";
// import { FilterQueryDto } from "src/shared/common/filter/dtos/filter.dto";
// import { FilterDataProvider } from "src/shared/common/filter/providers/filter-data.provider";
// import { UserService } from "src/users/providers/user.service";
// import { Repository } from "typeorm";
// import { CreateServiceDto } from "../dto/service.dto";
// import { Service } from "../service.entity";

// @Injectable()
// export class ServiceService extends BaseService<Service, CreateServiceDto> {
//   constructor(
//     @InjectRepository(Service)
//     repository: Repository<Service>,
//     filterData: FilterDataProvider<Service>,
//     usersService: UserService,
//   ) {
//     super(repository, filterData, usersService);
//   }

//   async front(filter: FilterQueryDto) {
//     const entity = await this.filtersFront(filter, "service")
//       .filterByActive()
//       .orderByOrder()
//       .execute();
//     return {
//       data: entity,
//     };
//   }

//   async findAll(filter: FilterQueryDto) {
//     const entity = await this.filters(filter, "service")
//       .provideFields(["featuredImage", "link"])
//       .orderByOrder()
//       .execute();
//     const result = await this.filters(filter, "service").count();

//     return {
//       data: entity,
//       recordsFiltered: entity.length,
//       totalRecords: +result,
//     };
//   }
// }
