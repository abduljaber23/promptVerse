import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import { ErrorCodes } from '../../common/errors/error-codes';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

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

  async verifyEmail(userId: string, verificationToken: string) {
    const user = await this.usersService.currentUser(userId);

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

  private generateVerificationLink(
    userId: string,
    verificationToken: string,
  ): string {
    const clientUrl = this.config.getOrThrow<string>('APP_URL');
    return `${clientUrl}/api/v1/auth/verify-email/${userId}/${verificationToken}`;
  }
}
