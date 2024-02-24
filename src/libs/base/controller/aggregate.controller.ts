/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import { AggregateCrudOptions } from '../types/crud-option.type';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { ApiBody } from '@nestjs/swagger';
import {  DeepPartial } from 'typeorm';
import { AggregateCommandService } from '../usecase/aggregate.command';
import { AggregateQueryService } from '../usecase/aggregate.query';
import { BaseAPIDto } from './entity.controller';
import {BaseEntity} from '@libs/base/entity/base.entity';

export function AggregateCrudController<TEntity extends BaseEntity>(
  options?: AggregateCrudOptions,
) {
  @Controller()
  @UseInterceptors(/* your interceptors if any */)
  class AggregateCrudControllerHost {
    constructor(
      public readonly serviceCommand: AggregateCommandService<TEntity>,
      public readonly serviceQuery: AggregateQueryService<TEntity>
    ) {}

    @Post()
    @ApiBody({ type: options?.createDto || BaseAPIDto })
    async create(
      @Body() itemData: DeepPartial<TEntity>,
      @Req() req?: any,
    ): Promise<TEntity> {
      return this.serviceCommand.create(itemData);
    }

    @Get()
    async findAll(
      @Query() query: CollectionQuery,
      @Req() req?: any,
    ): Promise<DataResponseFormat<TEntity>> {
      return this.serviceQuery.findAll(query);
    }

    @Get(':id')
    async findOne(
      @Param('id') id: string,
      @Req() req?: any,
    ): Promise<TEntity | undefined> {
      return this.serviceQuery.findOne(id);
    }

    @Put(':id')
    @ApiBody({ type: options?.updateDto || BaseAPIDto  })
    async update(
      @Param('id') id: string,
      @Body() itemData: Partial<TEntity>,
      @Req() req?: any,
    ): Promise<TEntity | undefined> {
      return this.serviceCommand.update(id, itemData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req?: any): Promise<void> {
      return this.serviceCommand.remove(id);
    }
  }

  return AggregateCrudControllerHost;
}
