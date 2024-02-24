import { UserInfo } from '@user/user-info.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TaskEntity } from '@project/persistence/tasks/task.entity';
import { IsNotEmpty } from 'class-validator';
export class CreateTaskCommand {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  projectId: string;
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

  currentUser: UserInfo;
  static fromCommand(command: CreateTaskCommand): TaskEntity {
    const taskDomain = new TaskEntity();
    taskDomain.title = command.title;
    taskDomain.description = command.description;
    taskDomain.status = command.status;
    taskDomain.projectId = command.projectId;
    taskDomain.assigneeId = command.assigneeId;
    taskDomain.tags = command.tags;
    taskDomain.priority = command.priority;
    taskDomain.dueDate = command.dueDate;
    taskDomain.createdBy = command?.currentUser?.id;
    taskDomain.updatedBy = command?.currentUser?.id;
    return taskDomain;
  }
}
export class UpdateTaskCommand extends PartialType(CreateTaskCommand) {
  @ApiProperty({
    example: 'd02dd06f-2a30-4ed8-a2a0-75c683e3092e',
  })
  @IsNotEmpty()
  id: string;
}
export class ArchiveTaskCommand {
  @ApiProperty({
    example: 'd02dd06f-2a30-4ed8-a2a0-75c683e3092e',
  })
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  reason: string;
  currentUser: UserInfo;
}
