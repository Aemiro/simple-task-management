import { UserEntity } from '@user/persistence/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCommands } from './usecases/users/user.usecase.commands';
import { UserRepository } from './persistence/users/user.repository';
import { UsersController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { UserQuery } from './usecases/users/user.usecase.queries';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [UsersController,AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserCommands, UserQuery,AuthService],
})
export class UserModule {}
