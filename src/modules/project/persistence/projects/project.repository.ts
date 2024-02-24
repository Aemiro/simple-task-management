import { BaseRepository } from '@libs/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { ProjectEntity } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProjectRepository extends BaseRepository<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectEntity)
    projectRepository: Repository<ProjectEntity>,
  ) {
    super(projectRepository);
  }
}
