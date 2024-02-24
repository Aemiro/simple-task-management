import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectEntity } from './persistence/projects/project.entity';
import { TaskEntity } from './persistence/tasks/task.entity';
import { TasksController } from './controllers/task.controller';
import { ProjectsController } from './controllers/project.controller';
import { ProjectQueries } from './usecases/projects/project.usecase.queries';
import { ProjectCommands } from './usecases/projects/project.usecase.commands';
import { ProjectRepository } from './persistence/projects/project.repository';
import { TaskCommand } from './usecases/tasks/task.usecase.commands';
import { TaskRepository } from './persistence/tasks/task.repository';
import { TaskQuery } from './usecases/tasks/task.usecase.queries';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, TaskEntity])],
  providers: [
    ProjectQueries,
    ProjectCommands,
    ProjectRepository,
    TaskCommand,
    TaskRepository,
    TaskQuery,
  ],
  controllers: [ProjectsController, TasksController],
})
export class ProjectModule {}
