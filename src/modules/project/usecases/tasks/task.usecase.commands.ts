import {
  ArchiveTaskCommand,
  CreateTaskCommand,
  UpdateTaskCommand,
} from './task.commands';
import { TaskResponse } from './task.response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfo } from '@user/user-info.dto';
import { TaskRepository } from '@project/persistence/tasks/task.repository';
@Injectable()
export class TaskCommand {
  constructor(private taskRepository: TaskRepository) {}
  async createTask(command: CreateTaskCommand): Promise<TaskResponse> {
    const taskDomain = CreateTaskCommand.fromCommand(command);
    taskDomain.createdBy = command.currentUser.id;
    taskDomain.updatedBy = command.currentUser.id;
    const task = await this.taskRepository.save(taskDomain);
    const taskResponse = TaskResponse.fromEntity(task);
    return taskResponse;
  }
  async updateTask(command: UpdateTaskCommand): Promise<TaskResponse> {
    const taskDomain = await this.taskRepository.getById(command.id);
    if (!taskDomain) {
      throw new NotFoundException(`Task not found with id ${command.id}`);
    }
    taskDomain.status = command.status;
    taskDomain.projectId = command.projectId;
    taskDomain.assigneeId = command.assigneeId;
    taskDomain.tags = command.tags;
    taskDomain.priority = command.priority;
    taskDomain.dueDate = command.dueDate;
    taskDomain.updatedBy = command.currentUser.id;
    taskDomain.description = command.description;
    taskDomain.title = command.title;
    const task = await this.taskRepository.save(taskDomain);
    const taskResponse = TaskResponse.fromEntity(task);
    return taskResponse;
  }
  async archiveTask(command: ArchiveTaskCommand): Promise<TaskResponse> {
    const task = await this.taskRepository.getById(command.id);
    if (!task) {
      throw new NotFoundException(`Task not found with id ${command.id}`);
    }
    task.deletedAt = new Date();
    task.deletedBy = command.currentUser.id;
    task.archiveReason = command.reason;
    const result = await this.taskRepository.update(task.id, task);
    return TaskResponse.fromEntity(result);
  }
  async restoreTask(id: string, currentUser: UserInfo): Promise<TaskResponse> {
    const taskDomain = await this.taskRepository.getById(id, [], true);
    if (!taskDomain) {
      throw new NotFoundException(`Task not found with id ${id}`);
    }
    const r = await this.taskRepository.restore(id);
    const taskResponse = TaskResponse.fromEntity(taskDomain);
    if (r) {
      taskDomain.deletedAt = null;
    }
    taskResponse.deletedAt = null;
    return taskResponse;
  }

  async deleteTask(id: string, currentUser: UserInfo): Promise<boolean> {
    const taskDomain = await this.taskRepository.getById(id, [], true);
    if (!taskDomain) {
      throw new NotFoundException(`Task not found with id ${id}`);
    }
    return await this.taskRepository.delete(id);
  }
}
