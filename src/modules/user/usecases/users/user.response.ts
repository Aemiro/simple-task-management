import { UserEntity } from '@user/persistence/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@user/domains/users/user';
export class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  archiveReason: string;
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
  jobTitle?: string;
  static fromEntity(userEntity: UserEntity): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = userEntity.id;
    userResponse.name = userEntity.name;
    userResponse.email = userEntity.email;
    userResponse.phoneNumber = userEntity.phoneNumber;
    userResponse.gender = userEntity.gender;
    userResponse.isAdmin = userEntity.isAdmin;
    userResponse.isActive = userEntity.isActive;
    userResponse.archiveReason = userEntity.archiveReason;
    userResponse.createdBy = userEntity.createdBy;
    userResponse.updatedBy = userEntity.updatedBy;
    userResponse.deletedBy = userEntity.deletedBy;
    userResponse.createdAt = userEntity.createdAt;
    userResponse.updatedAt = userEntity.updatedAt;
    userResponse.deletedAt = userEntity.deletedAt;
    userResponse.jobTitle = userEntity.jobTitle;
    return userResponse;
  }
  static fromDomain(user: User): UserResponse {
    const userResponse = new UserResponse();
    userResponse.id = user.id;
    userResponse.name = user.name;
    userResponse.email = user.email;
    userResponse.phoneNumber = user.phoneNumber;
    userResponse.gender = user.gender;
    userResponse.isAdmin = user.isAdmin;
    userResponse.isActive = user.isActive;
    userResponse.archiveReason = user.archiveReason;
    userResponse.createdBy = user.createdBy;
    userResponse.updatedBy = user.updatedBy;
    userResponse.deletedBy = user.deletedBy;
    userResponse.createdAt = user.createdAt;
    userResponse.updatedAt = user.updatedAt;
    userResponse.deletedAt = user.deletedAt;
    userResponse.jobTitle = user.jobTitle;
    return userResponse;
  }
}
