import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../common/decorators/public.decorator';
import { ApiSecurity } from '@nestjs/swagger';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Throttle({
    short: { limit: 2, ttl: 1000 },
    medium: {
      limit: 10,
      ttl: 60000,
      blockDuration: 10 * 60 * 1000,
    },
    long: { limit: 30, ttl: 3600000 },
  })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Throttle({
    short: { limit: 2, ttl: 1000 },
    medium: {
      limit: 5,
      ttl: 60000,
      blockDuration: 15 * 60 * 1000,
    },
    long: { limit: 20, ttl: 3600000 },
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(loginDto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return {
      message: 'Login successful',
    };
  }

  @ApiSecurity('access_token')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return {
      message: 'Logout successful',
    };
  }

  @Public()
  @Get('verify-email/:id/:verificationToken')
  async verifyEmail(
    @Param('id') id: string,
    @Param('verificationToken') verificationToken: string,
  ) {
    return this.authService.verifyEmail(id, verificationToken);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgetPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.sendResetPasswordLink(body.email);
  }

  @Public()
  @Get('reset-password/:id/:resetPasswordToken')
  async getResetPassword(
    @Param('id') id: string,
    @Param('resetPasswordToken') resetPasswordToken: string,
  ) {
    return this.authService.getResetPasswordLink(id, resetPasswordToken);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}
