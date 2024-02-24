import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '@project/persistence/tasks/task.entity';
import { Repository } from 'typeorm';
import { TaskResponse } from './task.response';
import { FilterOperators } from '@libs/collection-query/filter_operators';
@Injectable()
export class TaskQuery {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}
  async getTask(
    id: string,
    relations = [],
    withDeleted = false,
  ): Promise<TaskResponse> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations,
      withDeleted,
    });
    if (!task) {
      throw new NotFoundException(`Task not found with id ${id}`);
    }
    return TaskResponse.fromEntity(task);
  }
  async getTasks(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<TaskResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    const dataQuery = QueryConstructor.constructQuery<TaskEntity>(
      this.taskRepository,
      query,
    );
    const d = new DataResponseFormat<TaskResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => TaskResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getUserTasks(
    userId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<TaskResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'assignee_id',
        operator: FilterOperators.EqualTo,
        value: userId,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<TaskEntity>(
      this.taskRepository,
      query,
    );
    const d = new DataResponseFormat<TaskResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => TaskResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getProjectTasks(
    projectId: string,
    query: CollectionQuery,
  ): Promise<DataResponseFormat<TaskResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'project_id',
        operator: FilterOperators.EqualTo,
        value: projectId,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<TaskEntity>(
      this.taskRepository,
      query,
    );
    const d = new DataResponseFormat<TaskResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => TaskResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedTasks(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<TaskResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<TaskEntity>(
      this.taskRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<TaskResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => TaskResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
