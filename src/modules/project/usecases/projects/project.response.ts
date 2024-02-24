import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from '@project/persistence/projects/project.entity';
import { TaskResponse } from '../tasks/task.response';
export class ProjectResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  createdBy?: string;
  @ApiProperty()
  updatedBy?: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt?: Date;
  @ApiProperty()
  deletedBy?: string;
  @ApiProperty()
  archiveReason: string;
  tasks: TaskResponse[];
  static fromEntity(projectEntity: ProjectEntity): ProjectResponse {
    const projectResponse = new ProjectResponse();
    projectResponse.id = projectEntity.id;
    projectResponse.title = projectEntity.title;
    projectResponse.description = projectEntity.description;
    if (projectEntity.tasks) {
      projectResponse.tasks = projectEntity.tasks.map((task) => {
        return TaskResponse.fromEntity(task);
      });
    }
    projectResponse.isActive = projectEntity.isActive;
    projectResponse.createdBy = projectEntity.createdBy;
    projectResponse.updatedBy = projectEntity.updatedBy;
    projectResponse.deletedBy = projectEntity.deletedBy;
    projectResponse.createdAt = projectEntity.createdAt;
    projectResponse.updatedAt = projectEntity.updatedAt;
    projectResponse.deletedAt = projectEntity.deletedAt;
    projectResponse.archiveReason = projectEntity.archiveReason;
    return projectResponse;
  }
}
