import { UserInfo } from '@user/user-info.dto';
import { CollectionQuery } from '@libs/collection-query/collection-query';
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
  ArchiveUserCommand,
  CreateUserCommand,
  UpdateUserCommand,
} from '@user/usecases/users/user.commands';
import { UserResponse } from '@user/usecases/users/user.response';
import { UserCommands } from '@user/usecases/users/user.usecase.commands';
import { UserQuery } from '@user/usecases/users/user.usecase.queries';
import { CurrentUser } from '@user/decorators/current-user.decorator';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiResponse({ status: 404, description: 'Item not found' })
@ApiExtraModels(DataResponseFormat)
export class UsersController {
  constructor(
    private command: UserCommands,
    private userQuery: UserQuery,
  ) {}
  @Get('get-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async getUser(@Param('id') id: string) {
    return this.userQuery.getUser(id);
  }
  @Get('get-archived-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async getArchivedUser(@Param('id') id: string) {
    return this.userQuery.getUser(id, true);
  }
  @Get('get-users')
  @ApiPaginatedResponse(UserResponse)
  async getUsers(@Query() query: CollectionQuery) {
    return this.userQuery.getUsers(query);
  }
  @Post('create-user')
  //@AllowAnonymous()
  @ApiOkResponse({ type: UserResponse })
  async createUser(
    @CurrentUser() user: UserInfo,
    @Body() createUserCommand: CreateUserCommand,
  ) {
    createUserCommand.currentUser = user;
    return this.command.createUser(createUserCommand);
  }
  @Put('update-user')
  @ApiOkResponse({ type: UserResponse })
  async updateUser(
    @CurrentUser() user: UserInfo,
    @Body() updateUserCommand: UpdateUserCommand,
  ) {
    updateUserCommand.currentUser = user;
    return this.command.updateUser(updateUserCommand);
  }
  @Delete('archive-user')
  @ApiOkResponse({ type: UserResponse })
  async archiveUser(
    @CurrentUser() user: UserInfo,
    @Body() archiveCommand: ArchiveUserCommand,
  ) {
    archiveCommand.currentUser = user;
    return this.command.archiveUser(archiveCommand);
  }
  @Delete('delete-user/:id')
  @ApiOkResponse({ type: Boolean })
  async deleteUser(@CurrentUser() user: UserInfo, @Param('id') id: string) {
    return this.command.deleteUser(id, user);
  }
  @Post('restore-user/:id')
  @ApiOkResponse({ type: UserResponse })
  async restoreUser(@CurrentUser() user: UserInfo, @Param('id') id: string) {
    return this.command.restoreUser(id, user);
  }
  @Get('get-archived-users')
  @ApiPaginatedResponse(UserResponse)
  async getArchivedUsers(@Query() query: CollectionQuery) {
    return this.userQuery.getArchivedUsers(query);
  }
}
