import { UserEntity } from '@user/persistence/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCommands } from './usecases/users/user.usecase.commands';
import { UserRepository } from './persistence/users/user.repository';
import { UsersController } from './controllers/user.controller';
import { Module } from '@nestjs/common';
import { UserQuery } from './usecases/users/user.usecase.queries';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [UsersController, AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule],
  providers: [
    UserRepository,
    UserCommands,
    UserQuery,
    AuthService,
    JwtStrategy,
  ],
})
export class UserModule {}
