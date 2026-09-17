import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import { ErrorCodes } from '../../common/errors/error-codes';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { jwtPayloadType } from '../../common/enums/user.enum';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    const emailLowercase = email.toLowerCase().trim();
    const usernameTrimmed = username.trim();
    const userExists = await this.usersService.findByEmail(emailLowercase);
    if (userExists) {
      throw new ConflictException({
        code: ErrorCodes.EMAIL_ALREADY_EXISTS,
      });
    }
    const usernameExists =
      await this.usersService.findByUsername(usernameTrimmed);
    if (usernameExists) {
      throw new ConflictException({
        code: ErrorCodes.USERNAME_ALREADY_EXISTS,
      });
    }
    const hashedPassword = await this.bcryptService.hash(password);

    const newUser = await this.usersService.create({
      username: usernameTrimmed,
      email: emailLowercase,
      password: hashedPassword,
      verificationToken: randomBytes(32).toString('hex'),
      verificationTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    const link = this.generateVerificationLink(
      newUser.id,
      newUser.verificationToken!,
    );
    await this.mailService.sendVerifyEmailTemplate(emailLowercase, link);
    return {
      message:
        'A verification token has been sent to your email. Please verify your email address.',
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const emailLowercase = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(emailLowercase);
    if (!user) {
      throw new UnauthorizedException({
        code: ErrorCodes.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        code: ErrorCodes.INVALID_CREDENTIALS,
      });
    }

    if (!user.isEmailVerified) {
      const isTokenValid =
        user.verificationToken &&
        user.verificationTokenExpiresAt &&
        user.verificationTokenExpiresAt > new Date();

      if (!isTokenValid) {
        user.verificationToken = randomBytes(32).toString('hex');
        user.verificationTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.usersService.save(user);

        const link = this.generateVerificationLink(
          user.id,
          user.verificationToken,
        );
        await this.mailService.sendVerifyEmailTemplate(emailLowercase, link);

        throw new ForbiddenException({
          code: ErrorCodes.EMAIL_VERIFICATION_SENT,
        });
      }

      throw new ForbiddenException({
        code: ErrorCodes.EMAIL_NOT_VERIFIED,
      });
    }
    await this.usersService.updateLastLogin(user.id);
    const accessToken = await this.generateAccessToken({
      sub: user.id,
      role: user.role,
    });
    return {
      accessToken,
    };
  }

  async verifyEmail(userId: string, verificationToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user)
      throw new NotFoundException({
        code: ErrorCodes.VERIFICATION_TOKEN_NOT_FOUND,
      });

    if (user.isEmailVerified) {
      return { message: 'Your email has already been verified successfully.' };
    }

    if (user.verificationToken === null)
      throw new NotFoundException({
        code: ErrorCodes.VERIFICATION_TOKEN_NOT_FOUND,
      });
    if (user.verificationToken !== verificationToken)
      throw new BadRequestException({
        code: ErrorCodes.INVALID_LINK,
      });
    if (
      user.verificationTokenExpiresAt &&
      user.verificationTokenExpiresAt < new Date()
    )
      throw new BadRequestException({
        code: ErrorCodes.TOKEN_EXPIRED,
      });

    user.isEmailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    user.emailVerifiedAt = new Date();

    await this.usersService.save(user);
    return { message: 'Your email has been verified' };
  }

  async sendResetPasswordLink(email: string) {
    const neutralResponse = {
      message:
        'If an account with this email exists, a password reset link has been sent. Please check your inbox.',
    };

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return neutralResponse;
    }

    user.resetPasswordToken = randomBytes(32).toString('hex');
    user.resetPasswordTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const result = await this.usersService.save(user);
    const resetPasswordLink = `${this.config.getOrThrow<string>('CLIENT_URL')}/reset-password/${user.id}/${result.resetPasswordToken}`;

    await this.mailService.sendResetPasswordTemplate(email, resetPasswordLink);

    return neutralResponse;
  }

  async getResetPasswordLink(userId: string, resetPasswordToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user)
      throw new BadRequestException({
        code: ErrorCodes.INVALID_LINK,
      });
    if (
      user.resetPasswordToken === null ||
      user.resetPasswordToken !== resetPasswordToken
    )
      throw new BadRequestException({
        code: ErrorCodes.INVALID_LINK,
      });

    if (
      user.resetPasswordTokenExpiresAt &&
      user.resetPasswordTokenExpiresAt < new Date()
    )
      throw new BadRequestException({
        code: ErrorCodes.TOKEN_EXPIRED,
      });

    return { message: 'Valid link' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { userId, resetPasswordToken, newPassword } = dto;

    const user = await this.usersService.findById(userId);
    if (!user)
      throw new BadRequestException({
        code: ErrorCodes.INVALID_LINK,
      });
    if (
      user.resetPasswordToken === null ||
      user.resetPasswordToken !== resetPasswordToken
    )
      throw new BadRequestException({
        code: ErrorCodes.INVALID_LINK,
      });

    if (
      user.resetPasswordTokenExpiresAt &&
      user.resetPasswordTokenExpiresAt < new Date()
    )
      throw new BadRequestException({
        code: ErrorCodes.TOKEN_EXPIRED,
      });

    const hashedPassword = await this.bcryptService.hash(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiresAt = null;
    await this.usersService.save(user);
    return { message: 'Password reset successfully. Please login.' };
  }

  private generateVerificationLink(
    userId: string,
    verificationToken: string,
  ): string {
    const clientUrl = this.config.getOrThrow<string>('CLIENT_URL');
    return `${clientUrl}/verify-email/${userId}/${verificationToken}`;
  }

  private generateAccessToken(payload: jwtPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
