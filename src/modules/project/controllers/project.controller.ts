import { UserInfo } from '@user/user-info.dto';
import {
  CollectionQuery,
  IncludeQuery,
} from '@libs/collection-query/collection-query';
import { ApiPaginatedResponse } from '@libs/response-format/api-paginated-response';
import { DataResponseFormat } from '@libs/response-format/data-response-format';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ArchiveProjectCommand,
  CreateProjectCommand,
  UpdateProjectCommand,
} from '@project/usecases/projects/project.commands';
import { ProjectResponse } from '@project/usecases/projects/project.response';
import { ProjectCommands } from '@project/usecases/projects/project.usecase.commands';
import { ProjectQueries } from '@project/usecases/projects/project.usecase.queries';
import { CurrentUser } from '@user/decorators/current-user.decorator';

@Controller('projects')
@ApiTags('projects')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class ProjectsController {
  constructor(
    private readonly command: ProjectCommands,
    private readonly projectQueries: ProjectQueries,
  ) {}
  @Get('get-project/:id')
  @ApiOkResponse({ type: ProjectResponse })
  async getProject(
    @CurrentUser() user: UserInfo,
    @Query() includeQuery: IncludeQuery,
    @Param('id') id: string,
  ) {
    return this.projectQueries.getProject(id, includeQuery.includes);
  }
  @Get('get-archived-project/:id')
  @ApiOkResponse({ type: ProjectResponse })
  async getArchivedProject(
    @CurrentUser() user: UserInfo,
    @Query() includeQuery: IncludeQuery,
    @Param('id') id: string,
  ) {
    return this.projectQueries.getProject(id, includeQuery.includes, true);
  }
  @Get('get-projects')
  @ApiPaginatedResponse(ProjectResponse)
  async getProjects(
    @CurrentUser() user: UserInfo,
    @Query() query: CollectionQuery,
  ) {
    return this.projectQueries.getProjects(query);
  }
  @Post('create-project')
  @ApiOkResponse({ type: ProjectResponse })
  async createProject(
    @CurrentUser() user: UserInfo,
    @Body() createProjectCommand: CreateProjectCommand,
  ) {
    createProjectCommand.currentUser = user;
    return this.command.createProject(createProjectCommand);
  }
  @Put('update-project')
  @ApiOkResponse({ type: ProjectResponse })
  async updateProject(
    @CurrentUser() user: UserInfo,
    @Body() updateProjectCommand: UpdateProjectCommand,
  ) {
    updateProjectCommand.currentUser = user;
    return this.command.updateProject(updateProjectCommand);
  }
  @Delete('archive-project')
  @ApiOkResponse({ type: ProjectResponse })
  async archiveProject(
    @CurrentUser() user: UserInfo,
    @Body() archiveCommand: ArchiveProjectCommand,
  ) {
    archiveCommand.currentUser = user;
    return this.command.archiveProject(archiveCommand);
  }
  @Delete('delete-project/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteProject(@CurrentUser() user: UserInfo, @Param('id') id: string) {
    return this.command.deleteProject(id, user);
  }
  @Post('restore-project/:id')
  @ApiOkResponse({ type: ProjectResponse })
  async restoreProject(@CurrentUser() user: UserInfo, @Param('id') id: string) {
    return this.command.restoreProject(id, user);
  }
  @Get('get-archived-projects')
  @ApiPaginatedResponse(ProjectResponse)
  async getArchivedProjects(
    @CurrentUser() user: UserInfo,
    @Query() query: CollectionQuery,
  ) {
    return this.projectQueries.getArchivedProjects(query);
  }
}
