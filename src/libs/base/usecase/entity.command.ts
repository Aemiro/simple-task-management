/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import {  Repository, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import {BaseEntity} from '@libs/base/entity/base.entity';

@Injectable()
export class EntityCommandService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async create(itemData: DeepPartial<T>, req?: any): Promise<T> {
    const item = this.repository.create(itemData);
    return await this.repository.save(item);
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

  async update(id: string, itemData: any): Promise<T | undefined> {
    await this.findOne(id);
    await this.repository.update(id, itemData);
    return this.findOne(id);
  }

  async remove(id: string, req?: any): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
}
