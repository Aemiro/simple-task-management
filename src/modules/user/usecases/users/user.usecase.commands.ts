import {
  ArchiveUserCommand,
  CreateUserCommand,
  UpdateUserCommand,
} from './user.commands';
import { UserRepository } from '@user/persistence/users/user.repository';
import { UserResponse } from './user.response';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  // OnModuleInit,
} from '@nestjs/common';
import { UserInfo } from '@user/user-info.dto';
import { Util } from '@libs/common/util';
// import { User } from '@user/domains/users/user';
@Injectable()
export class UserCommands /*implements OnModuleInit*/ {
  constructor(private userRepository: UserRepository) {}
  // onModuleInit() {
  //   const defaultAdmin = new User();
  //   defaultAdmin.name = 'Admin';
  //   defaultAdmin.email = 'admin@gmail.com';
  //   defaultAdmin.phoneNumber = '+251911111111';
  //   defaultAdmin.password = Util.hashPassword('P@ssw0rd');
  //   defaultAdmin.isAdmin = true;
  //   defaultAdmin.isActive = true;
  //   defaultAdmin.jobTitle = 'Project Manager';
  //   defaultAdmin.gender = 'Male';
  //   this.userRepository.insert(defaultAdmin);
  // }
  async createUser(command: CreateUserCommand): Promise<UserResponse> {
    if (await this.userRepository.getByPhoneNumber(command.phoneNumber, true)) {
      throw new BadRequestException(
        `User already exist with this phone number`,
      );
    }
    if (
      command.email &&
      (await this.userRepository.getByEmail(command.email, true))
    ) {
      throw new BadRequestException(
        `User already exist with this email Address`,
      );
    }
    const userDomain = CreateUserCommand.fromCommand(command);
    userDomain.password = Util.hashPassword(command.password);
    userDomain.createdBy = command.currentUser.id;
    userDomain.updatedBy = command.currentUser.id;
    const user = await this.userRepository.insert(userDomain);

    return UserResponse.fromDomain(user);
  }
  async updateUser(command: UpdateUserCommand): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(command.id);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${command.id}`);
    }
    if (userDomain.phoneNumber !== command.phoneNumber) {
      const user = await this.userRepository.getByPhoneNumber(
        command.phoneNumber,
        true,
      );
      if (user) {
        throw new BadRequestException(
          `User already exist with this phone number`,
        );
      }
    }
    if (
      command.email &&
      userDomain.email !== command.email &&
      (await this.userRepository.getByEmail(command.email, true))
    ) {
      throw new BadRequestException(
        `User already exist with this email Address`,
      );
    }
    delete command.password;
    userDomain.email = command.email;
    userDomain.name = command.name;
    userDomain.isActive = command.isActive;
    userDomain.phoneNumber = command.phoneNumber;
    userDomain.gender = command.gender;
    userDomain.jobTitle = command.jobTitle;
    userDomain.updatedBy = command?.currentUser?.id;
    const user = await this.userRepository.update(userDomain);
    return UserResponse.fromDomain(user);
  }
  async archiveUser(command: ArchiveUserCommand): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(command.id);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${command.id}`);
    }
    userDomain.deletedAt = new Date();
    userDomain.deletedBy = command.currentUser.id;
    userDomain.archiveReason = command.reason;
    const result = await this.userRepository.update(userDomain);

    return UserResponse.fromDomain(result);
  }
  async restoreUser(id: string, currentUser: UserInfo): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(id, true);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    const r = await this.userRepository.restore(id);
    userDomain.deletedAt = null;
    return UserResponse.fromDomain(userDomain);
  }
  async deleteUser(id: string, currentUser: UserInfo): Promise<boolean> {
    const userDomain = await this.userRepository.getById(id, true);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    const result = await this.userRepository.delete(id);
    return result;
  }
  async activateOrBlockUser(
    id: string,
    currentUser: UserInfo,
  ): Promise<UserResponse> {
    const userDomain = await this.userRepository.getById(id);
    if (!userDomain) {
      throw new NotFoundException(`User not found with id ${id}`);
    }
    userDomain.isAdmin = !userDomain.isAdmin;
    const result = await this.userRepository.update(userDomain);

    return UserResponse.fromDomain(result);
  }
}
