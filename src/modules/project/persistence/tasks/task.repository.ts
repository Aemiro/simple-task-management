import { BaseRepository } from '@libs/common/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TaskRepository extends BaseRepository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }
}
