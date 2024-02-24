import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponse } from '../projects/project.response';
import { UserResponse } from '@user/usecases/users/user.response';
import { TaskEntity } from '@project/persistence/tasks/task.entity';
export class TaskResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  assigneeId: string;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  priority: string;
  @ApiProperty()
  dueDate: Date;
  @ApiProperty()
  projectId: string;
  @ApiProperty()
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
  project: ProjectResponse;
  assignee: UserResponse;
  static fromEntity(taskEntity: TaskEntity): TaskResponse {
    const taskResponse = new TaskResponse();
    taskResponse.id = taskEntity.id;
    taskResponse.title = taskEntity.title;
    taskResponse.description = taskEntity.description;
    taskResponse.tags = taskEntity.tags;
    taskResponse.priority = taskEntity.priority;
    taskResponse.dueDate = taskEntity.dueDate;
    taskResponse.projectId = taskEntity.projectId;

    if (taskEntity.project) {
      taskResponse.project = ProjectResponse.fromEntity(taskEntity.project);
    }
    if (taskEntity.assignee) {
      taskResponse.assignee = UserResponse.fromEntity(taskEntity.assignee);
    }
    taskResponse.status = taskEntity.status;
    taskResponse.createdBy = taskEntity.createdBy;
    taskResponse.updatedBy = taskEntity.updatedBy;
    taskResponse.deletedBy = taskEntity.deletedBy;
    taskResponse.createdAt = taskEntity.createdAt;
    taskResponse.updatedAt = taskEntity.updatedAt;
    taskResponse.deletedAt = taskEntity.deletedAt;
    taskResponse.archiveReason = taskEntity.archiveReason;
    return taskResponse;
  }
}
