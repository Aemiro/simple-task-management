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
import {  DeepPartial } from 'typeorm';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { EntityCrudOptions } from '../types/crud-option.type';
import { CollectionQuery } from '@libs/collection-query/collection-query';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { EntityCommandService, EntityQueryService } from '../usecase';
import {BaseEntity} from '@libs/base/entity/base.entity';

export class BaseAPIDto {}

export function EntityCrudController<TEntity extends BaseEntity>(
  options: EntityCrudOptions,
) {
  const {aggregateIdName, createDto, updateDto } = options;

  @Controller()
  @UseInterceptors(/* your interceptors if any */)
  @ApiBearerAuth()
  class EntityCrudControllerHost {
    constructor(
      public readonly serviceCommand: EntityCommandService<TEntity>,
      public readonly serviceQuery: EntityQueryService<TEntity>,
    ) {}

    @Post()
    @ApiBody({ type: createDto || BaseAPIDto })
    async create(
      @Body() itemData: DeepPartial<TEntity>,
      @Req() req?: any,
    ): Promise<TEntity> {
      return this.serviceCommand.create(itemData);
    }

    @Get('list/:id')
    async findAll(
      @Param('id') id: string,
      @Query() query: CollectionQuery,
      @Req() req?: any,
    ): Promise<DataResponseFormat<TEntity>> {
      return this.serviceQuery.findAll( id,query, options);
    }

    @Get(':id')
    async findOne(
      @Param('id') id: string,
      @Req() req?: any,
    ): Promise<TEntity | undefined> {
      return this.serviceQuery.findOne(id);
    }

    @Put(':id')
    @ApiBody({ type: updateDto || BaseAPIDto })
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

  return EntityCrudControllerHost;
}
