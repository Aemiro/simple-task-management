/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository, DeepPartial, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {BaseEntity} from '@libs/base/entity/base.entity';

@Injectable()
export class AggregateCommandService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async create(itemData: DeepPartial<T>, req?: any): Promise<T> {
    const item = this.repository.create(itemData);
    return await this.repository.save(item);
  }

  async update(id: string, itemData: any): Promise<T | undefined> {
    const item = await this.findOne(id);
    if (item) {
      await this.repository.update(id, itemData);
    }
    return item;
  }

  async remove(id: string, req?: any): Promise<void> {
    const item = await this.findOne(id);
    if (item) {
      await this.repository.remove(item);
    }
  }

  async findOne(id: any, req?: any): Promise<T | undefined> {   
     const findOptions: FindOneOptions<T> = {
    where: {
      id: id,
    } as FindOptionsWhere<T>,
    withDeleted:true,
  };
    return await this.repository.findOne(findOptions);
  }
}

