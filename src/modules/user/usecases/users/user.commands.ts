import { UserInfo } from '@user/user-info.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { User } from '@user/domains/users/user';
import { Gender } from '@libs/common/enums';

export class CreateUserCommand {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'someone@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '+251911111111',
  })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({
    enum: Gender,
  })
  @IsEnum(Gender, {
    message: 'User Gender must be either male or female',
  })
  gender: string;
  @ApiProperty()
  jobTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  currentUser: UserInfo;

  static fromCommand(command: CreateUserCommand): User {
    const userDomain = new User();
    userDomain.name = command.name;
    userDomain.email = command.email;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.jobTitle = command.jobTitle;
    userDomain.isActive = true;
    userDomain.isAdmin = false;
    return userDomain;
  }
}
export class UpdateUserCommand extends PartialType(CreateUserCommand) {
  @ApiProperty({
    example: 'd02dd06f-2a30-4ed8-a2a0-75c683e3092e',
  })
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  isActive: boolean;
}
export class ArchiveUserCommand {
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
