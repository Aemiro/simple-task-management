import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ChangePasswordCommand,
  UpdatePasswordCommand,
  UserLoginCommand,
} from '@user/auth.commands';
import { Util } from '@libs/common/util';
import { UserInfo } from '@user/user-info.dto';
import { UserEntity } from '@user/persistence/users/user.entity';
import { UserResponse } from '@user/usecases/users/user.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async login(loginCommand: UserLoginCommand) {
    const account = await this.userRepository.findOneBy({
      email: loginCommand.email,
    });
    if (!account) {
      throw new BadRequestException(`Incorrect email or password`);
    }

    if (!Util.comparePassword(loginCommand.password, account.password)) {
      throw new BadRequestException(`Incorrect email or password`);
    }
    if (account.isActive === false || !account.isActive) {
      throw new BadRequestException(
        `You have been blocked, please contact us.`,
      );
    }

    const payload: UserInfo = {
      id: account.id,
      isAdmin: account.isAdmin,
      email: account?.email,
      name: account?.name,
      gender: account?.gender,
      jobTitle: account?.jobTitle,
      phoneNumber: account?.phoneNumber,
    };
    const accessToken = Util.GenerateToken(payload, '60m'); //60m
    const refreshToken = Util.GenerateRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
      profile: UserResponse.fromEntity(account),
    };
  }
  async changePassword(changePasswordCommand: ChangePasswordCommand) {
    const currentUser = changePasswordCommand.currentUser;
    const user = await this.userRepository.findOneBy({
      id: currentUser.id,
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (
      !Util.comparePassword(
        changePasswordCommand.currentPassword,
        user.password,
      )
    ) {
      throw new BadRequestException(`Incorrect old password`);
    }
    user.password = Util.hashPassword(changePasswordCommand.password);
    const result = await this.userRepository.update(user.id, user);
    return result ? true : false;
  }
  async updatePassword(updatePasswordCommand: UpdatePasswordCommand) {
    const user = await this.userRepository.findOneBy({
      email: updatePasswordCommand.email,
    });
    if (!user) {
      throw new NotFoundException(`User account not found with this email`);
    }
    user.password = Util.hashPassword(updatePasswordCommand.password);
    const result = await this.userRepository.update(user.id, user);
    return result ? true : false;
  }
}
