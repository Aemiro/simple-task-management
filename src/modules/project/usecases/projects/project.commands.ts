import { UserInfo } from '@user/user-info.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProjectEntity } from '@project/persistence/projects/project.entity';
import { IsNotEmpty } from 'class-validator';
export class CreateProjectCommand {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  isActive: boolean;
  currentUser: UserInfo;
  static fromCommand(command: CreateProjectCommand): ProjectEntity {
    const projectDomain = new ProjectEntity();
    projectDomain.title = command.title;
    projectDomain.description = command.description;
    projectDomain.isActive = command.isActive;
    projectDomain.createdBy = command?.currentUser?.id;
    projectDomain.updatedBy = command?.currentUser?.id;
    return projectDomain;
  }
}
export class UpdateProjectCommand extends PartialType(CreateProjectCommand) {
  @ApiProperty({
    example: 'd02dd06f-2a30-4ed8-a2a0-75c683e3092e',
  })
  @IsNotEmpty()
  id: string;
}
export class ArchiveProjectCommand {
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
