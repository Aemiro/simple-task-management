/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ObjectCrudOptions } from '../types/crud-option.type';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { BaseAPIDto } from './entity.controller';
import { ObjectCommandService, ObjectQueryService } from '../usecase';
import {BaseEntity} from '@libs/base/entity/base.entity';

export function ObjectCrudController<TEntity extends BaseEntity>(
  options: ObjectCrudOptions,
) {
  const {
    firstAggregateIdName,
    firstInclude = 'first',
    secondAggregateIdName,
    secondInclude = 'second',
    assignFirstDto,
    assignSecondDto,
  } = options;

  @Controller()
  @UseInterceptors(/* your interceptors if any */)
  @ApiBearerAuth()
  class ObjectCrudControllerHost {
    constructor(
      public readonly serviceCommand: ObjectCommandService<TEntity>,
      public readonly serviceQuery: ObjectQueryService<TEntity>
    ) {}

    @Post(`assign-${firstInclude}`)
    @ApiBody({ type: assignFirstDto || BaseAPIDto })
    async bulkSaveFirst(@Body() itemData: any, @Req() req?: any): Promise<any> {
      return this.serviceCommand.bulkSaveFirst(itemData, options);
    }

    @Post(`assign-${secondInclude}`)
    @ApiBody({ type: assignSecondDto || BaseAPIDto })
    async bulkSaveSecond(
      @Body() itemData: any,
      @Req() req?: any,
    ): Promise<any> {
      return this.serviceCommand.bulkSaveSecond(itemData, options);
    }

    @Get(`:id/${firstInclude}`)
    async findAllFirst(
      @Param('id') id: string,
      @Query() query: CollectionQuery,
      @Req() req?: any,
    ): Promise<DataResponseFormat<TEntity>> {
      return this.serviceQuery.findAllFirst(id, query, options);
    }

    @Get(`:id/${secondInclude}`)
    async findAllSecond(
      @Param('id') id: string,
      @Query() query: CollectionQuery,
      @Req() req?: any,
    ): Promise<DataResponseFormat<TEntity>> {
      return this.serviceQuery.findAllSecond(id, query, options);
    }
  }

  return ObjectCrudControllerHost;
}
