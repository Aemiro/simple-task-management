import {
  ArchiveProjectCommand,
  CreateProjectCommand,
  UpdateProjectCommand,
} from './project.commands';
import { ProjectResponse } from './project.response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfo } from '@user/user-info.dto';
import { ProjectRepository } from '@project/persistence/projects/project.repository';
@Injectable()
export class ProjectCommands {
  constructor(private projectRepository: ProjectRepository) {}
  async createProject(command: CreateProjectCommand): Promise<ProjectResponse> {
    const projectDomain = CreateProjectCommand.fromCommand(command);
    projectDomain.createdBy = command.currentUser.id;
    projectDomain.updatedBy = command.currentUser.id;
    const project = await this.projectRepository.save(projectDomain);
    const projectResponse = ProjectResponse.fromEntity(project);
    return projectResponse;
  }
  async updateProject(command: UpdateProjectCommand): Promise<ProjectResponse> {
    const projectDomain = await this.projectRepository.getById(command.id);
    if (!projectDomain) {
      throw new NotFoundException(`Project not found with id ${command.id}`);
    }
    projectDomain.isActive = command.isActive;
    projectDomain.updatedBy = command.currentUser.id;
    projectDomain.description = command.description;
    projectDomain.title = command.title;
    const project = await this.projectRepository.save(projectDomain);
    const projectResponse = ProjectResponse.fromEntity(project);
    return projectResponse;
  }
  async archiveProject(
    command: ArchiveProjectCommand,
  ): Promise<ProjectResponse> {
    const project = await this.projectRepository.getById(command.id);
    if (!project) {
      throw new NotFoundException(`Project not found with id ${command.id}`);
    }
    project.deletedAt = new Date();
    project.deletedBy = command.currentUser.id;
    project.archiveReason = command.reason;
    const result = await this.projectRepository.update(project.id, project);
    return ProjectResponse.fromEntity(result);
  }
  async restoreProject(
    id: string,
    currentUser: UserInfo,
  ): Promise<ProjectResponse> {
    const projectDomain = await this.projectRepository.getById(id, [], true);
    if (!projectDomain) {
      throw new NotFoundException(`Project not found with id ${id}`);
    }
    const r = await this.projectRepository.restore(id);
    const projectResponse = ProjectResponse.fromEntity(projectDomain);
    if (r) {
      projectDomain.deletedAt = null;
    }
    projectResponse.deletedAt = null;
    return projectResponse;
  }

  async deleteProject(id: string, currentUser: UserInfo): Promise<boolean> {
    const projectDomain = await this.projectRepository.getById(id, [], true);
    if (!projectDomain) {
      throw new NotFoundException(`Project not found with id ${id}`);
    }
    return await this.projectRepository.delete(id);
  }
}
