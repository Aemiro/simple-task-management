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
  ArchiveTaskCommand,
  CreateTaskCommand,
  UpdateTaskCommand,
} from '@project/usecases/tasks/task.commands';
import { TaskResponse } from '@project/usecases/tasks/task.response';
import { TaskCommand } from '@project/usecases/tasks/task.usecase.commands';
import { TaskQuery } from '@project/usecases/tasks/task.usecase.queries';
import { CurrentUser } from '@user/decorators/current-user.decorator';

@Controller('tasks')
@ApiTags('tasks')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class TasksController {
  constructor(
    private readonly command: TaskCommand,
    private readonly taskQueries: TaskQuery,
  ) {}
  @Get('get-task/:id')
  @ApiOkResponse({ type: TaskResponse })
  async getTask(
    @CurrentUser() user: UserInfo,
    @Query() includeQuery: IncludeQuery,
    @Param('id') id: string,
  ) {
    return this.taskQueries.getTask(id, includeQuery.includes);
  }
  @Get('get-archived-task/:id')
  @ApiOkResponse({ type: TaskResponse })
  async getArchivedTask(
    @CurrentUser() user: UserInfo,
    @Query() includeQuery: IncludeQuery,
    @Param('id') id: string,
  ) {
    return this.taskQueries.getTask(id, includeQuery.includes, true);
  }
  @Get('get-tasks')
  @ApiPaginatedResponse(TaskResponse)
  async getTasks(
    @CurrentUser() user: UserInfo,
    @Query() query: CollectionQuery,
  ) {
    return this.taskQueries.getTasks(query);
  }
  @Get('get-user-tasks/:userId')
  @ApiPaginatedResponse(TaskResponse)
  async getUserTasks(
    @CurrentUser() user: UserInfo,
    @Param('userId') userId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.taskQueries.getUserTasks(userId, query);
  }
  @Get('get-project-tasks/:projectId')
  @ApiPaginatedResponse(TaskResponse)
  async getProjectTasks(
    @CurrentUser() user: UserInfo,
    @Param('projectId') projectId: string,
    @Query() query: CollectionQuery,
  ) {
    return this.taskQueries.getProjectTasks(projectId, query);
  }
  @Post('create-task')
  @ApiOkResponse({ type: TaskResponse })
  async createTask(
    @CurrentUser() user: UserInfo,
    @Body() createTaskCommand: CreateTaskCommand,
  ) {
    createTaskCommand.currentUser = user;
    return this.command.createTask(createTaskCommand);
  }
  @Put('update-task')
  @ApiOkResponse({ type: TaskResponse })
  async updateTask(
    @CurrentUser() user: UserInfo,
    @Body() updateTaskCommand: UpdateTaskCommand,
  ) {
    updateTaskCommand.currentUser = user;
    return this.command.updateTask(updateTaskCommand);
  }
  @Delete('archive-task')
  @ApiOkResponse({ type: TaskResponse })
  async archiveTask(
    @CurrentUser() user: UserInfo,
    @Body() archiveCommand: ArchiveTaskCommand,
  ) {
    archiveCommand.currentUser = user;
    return this.command.archiveTask(archiveCommand);
  }
  @Delete('delete-task/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteTask(@CurrentUser() user: UserInfo, @Param('id') id: string) {
    return this.command.deleteTask(id, user);
  }
  @Post('restore-task/:id')
  @ApiOkResponse({ type: TaskResponse })
  async restoreTask(@CurrentUser() user: UserInfo, @Param('id') id: string) {
    return this.command.restoreTask(id, user);
  }
  @Get('get-archived-tasks')
  @ApiPaginatedResponse(TaskResponse)
  async getArchivedTasks(
    @CurrentUser() user: UserInfo,
    @Query() query: CollectionQuery,
  ) {
    return this.taskQueries.getArchivedTasks(query);
  }
}
