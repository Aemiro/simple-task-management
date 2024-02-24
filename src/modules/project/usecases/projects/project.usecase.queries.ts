import { CollectionQuery } from '@libs/collection-query/collection-query';
import { QueryConstructor } from '@libs/collection-query/query-constructor';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '@project/persistence/projects/project.entity';
import { Repository } from 'typeorm';
import { ProjectResponse } from './project.response';
import { FilterOperators } from '@libs/collection-query/filter_operators';
@Injectable()
export class ProjectQueries {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}
  async getProject(
    id: string,
    relations = [],
    withDeleted = false,
  ): Promise<ProjectResponse> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
      relations,
      withDeleted: withDeleted,
    });
    if (!project) {
      throw new NotFoundException(`Project not found with id ${id}`);
    }
    return ProjectResponse.fromEntity(project);
  }
  async getProjects(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<ProjectResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    const dataQuery = QueryConstructor.constructQuery<ProjectEntity>(
      this.projectRepository,
      query,
    );
    const d = new DataResponseFormat<ProjectResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => ProjectResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
  async getArchivedProjects(
    query: CollectionQuery,
  ): Promise<DataResponseFormat<ProjectResponse>> {
    if (!query.filter) {
      query.filter = [];
    }
    query.filter.push([
      {
        field: 'deleted_at',
        operator: FilterOperators.NotNull,
      },
    ]);
    const dataQuery = QueryConstructor.constructQuery<ProjectEntity>(
      this.projectRepository,
      query,
    );
    dataQuery.withDeleted();
    const d = new DataResponseFormat<ProjectResponse>();
    if (query.count) {
      d.count = await dataQuery.getCount();
    } else {
      const [result, total] = await dataQuery.getManyAndCount();
      d.data = result.map((entity) => ProjectResponse.fromEntity(entity));
      d.count = total;
    }
    return d;
  }
}
