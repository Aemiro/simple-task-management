import * as jwt from 'jsonwebtoken';

import { ChangePasswordCommand, UserLoginCommand } from '@user/auth.commands';
import { AllowAnonymous } from 'modules/auth/decorators/allow-anonymous.decorator';
import { CurrentUser } from 'modules/auth/decorators/current-user.decorator';
import { UserInfo } from '@user/user-info.dto';
import { Util } from '@libs/common/util';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@user/auth.service';
import { JwtAuthGuard } from '@user/guards/jwt-auth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @AllowAnonymous()
  async login(@Body() loginCommand: UserLoginCommand) {
    return this.authService.login(loginCommand);
  }
  @Get('get-user-info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@CurrentUser() user: UserInfo) {
    return user;
  }
  @Post('refresh')
  @AllowAnonymous()
  async getRefreshToken(@Headers() headers: object) {
    if (!headers['x-refresh-token']) {
      throw new ForbiddenException(`Refresh token required`);
    }
    try {
      const refreshToken = headers['x-refresh-token'];
      const p = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN,
      ) as UserInfo;
      return {
        accessToken: Util.GenerateToken(
          {
            id: p.id,
            isAdmin: p.isAdmin,
            email: p?.email,
            name: p?.name,
            gender: p?.gender,
            jobTitle: p?.jobTitle,
            phoneNumber: p?.phoneNumber,
          },
          '60m',
        ),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  @Post('change-password')
  async changePassword(
    @CurrentUser() user: UserInfo,
    @Body() changePasswordCommand: ChangePasswordCommand,
  ) {
    changePasswordCommand.currentUser = user;
    return this.authService.changePassword(changePasswordCommand);
  }
}
