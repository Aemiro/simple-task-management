import { Injectable } from "@nestjs/common";
import {  Repository } from "typeorm";
import { ObjectCrudOptions } from "../types/crud-option.type";
import {BaseEntity} from '@libs/base/entity/base.entity';

@Injectable()
export class ObjectCommandService<TEntity extends BaseEntity> {
  constructor(private readonly repository: Repository<TEntity>) { }

  async bulkSaveFirst(payload: any, relationCrudOptions: ObjectCrudOptions) {
    const firstAggregateIdName = relationCrudOptions.firstAggregateIdName;
    const secondAggregateIdName = relationCrudOptions.secondAggregateIdName;

    const include = relationCrudOptions.firstInclude;
    const entityId: string = payload[firstAggregateIdName];

    const parsedPayload: any[] = [];

    const childData: any[] = payload[include];
    childData.forEach((data) => {
      parsedPayload.push({
        [firstAggregateIdName]: entityId,
        [secondAggregateIdName]: data,
      });
    });

    const deleteCondition = {};
    deleteCondition[firstAggregateIdName] = entityId;

    await this.repository.delete(deleteCondition);

    const data = this.repository.create(parsedPayload);
    return await this.repository.save(data);
  }

  async bulkSaveSecond(payload: any, relationCrudOptions: ObjectCrudOptions) {
    const firstAggregateIdName = relationCrudOptions.firstAggregateIdName;
    const secondAggregateIdName = relationCrudOptions.secondAggregateIdName;

    const include = relationCrudOptions.secondInclude;
    const entityId: string = payload[secondAggregateIdName];

    const parsedPayload: any[] = [];

    const childData: any[] = payload[include];
    childData.forEach((data) => {
      parsedPayload.push({
        [secondAggregateIdName]: entityId,
        [firstAggregateIdName]: data,
      });
    });

    const deleteCondition = {};
    deleteCondition[secondAggregateIdName] = entityId;

    await this.repository.delete(deleteCondition);

    const data = this.repository.create(parsedPayload);
    return await this.repository.save(data);
  }
}
