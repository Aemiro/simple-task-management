/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { FilterOperators } from '@libs/collection-query/filter_operators';
import { EntityCrudOptions } from '../types/crud-option.type';
import {BaseEntity} from '@libs/base/entity/base.entity';

@Injectable()
export class EntityQueryService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}
  async findAll(
    entityId: string,
    query: CollectionQuery,
    entityCrudOptions: EntityCrudOptions,
    req?: any,
  ) {
    const aggregateIdName = entityCrudOptions.aggregateIdName;
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: aggregateIdName,
        value: entityId,
        operator: FilterOperators.EqualTo,
      },
    ]);

    const dataQuery = QueryConstructor.constructQuery<T>(
      this.repository,
      query,
    );
    const response = new DataResponseFormat<T>();
    if (query.count) {
      response.count = await dataQuery.getCount();
    } else {
      const [result, count] = await dataQuery.getManyAndCount();
      response.count = count;
      response.data = result;
    }
    return response;
  }

  async findOne(id: string, req?: any): Promise<T | undefined> {
    const findOptions: FindOneOptions<T> = {
      where: {
        id: id,
      } as FindOptionsWhere<T>,
      // relations,
      withDeleted:true,
    };
    return await this.repository.findOne(findOptions);

}
}
