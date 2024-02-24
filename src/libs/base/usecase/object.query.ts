import { CollectionQuery } from "@libs/collection-query/collection-query";
import { FilterOperators } from "@libs/collection-query/filter_operators";
import { QueryConstructor } from "@libs/collection-query/query-constructor";
import { DataResponseFormat } from "@libs/response-format/data-response-format";
import { Injectable } from "@nestjs/common";
import {  Repository } from "typeorm";
import { ObjectCrudOptions } from "../types/crud-option.type";
import {BaseEntity} from '@libs/base/entity/base.entity';

@Injectable()
export class ObjectQueryService<TEntity extends BaseEntity> {
  constructor(private readonly repository: Repository<TEntity>) { }

  async findAllFirst(
    entityId: string,
    query: CollectionQuery,
    relationCrudOptions: ObjectCrudOptions,
  ) {
    const entityIdName = relationCrudOptions.firstAggregateIdName;
    const include = relationCrudOptions.firstInclude;

    return await this.getData(entityId, entityIdName, include, query);
  }

  async findAllSecond(
    entityId: string,
    query: CollectionQuery,
    relationCrudOptions: ObjectCrudOptions,
  ) {
    const entityIdName = relationCrudOptions.secondAggregateIdName;
    const include = relationCrudOptions.secondInclude;

    return await this.getData(entityId, entityIdName, include, query);
  }

  async getData(
    entityId: string,
    entityIdName: string,
    include: string,
    query: CollectionQuery,
  ) {
    query.filter.push([
      {
        field: entityIdName,
        value: entityId,
        operator: FilterOperators.EqualTo,
      },
    ]);

    query.includes.push(include);

    const dataQuery = QueryConstructor.constructQuery<TEntity>(
      this.repository,
      query,
    );
    const response = new DataResponseFormat<TEntity>();
    if (query.count) {
      response.count = await dataQuery.getCount();
    } else {
      const [result, count] = await dataQuery.getManyAndCount();
      response.count = count;
      response.data = result;
    }
    return response;
  }
}
