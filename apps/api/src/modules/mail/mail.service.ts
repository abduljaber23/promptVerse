import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorCodes } from '../../common/errors/error-codes';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmailTemplate(email: string, link: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Verify your account',
        template: 'verify-email',
        context: { link },
      });
    } catch (e) {
      const error = e as Error;
      this.logger.error(
        `Error sending verify email: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException({
        code: ErrorCodes.EMAIL_SEND_FAILED,
      });
    }
  }

  async sendResetPasswordTemplate(email: string, link: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset your password',
        template: 'reset-password',
        context: { link },
      });
    } catch (e) {
      const error = e as Error;
      this.logger.error(
        `Error sending reset password email: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException({
        code: ErrorCodes.EMAIL_SEND_FAILED,
      });
    }
  }
}
