import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCodes } from '../errors/error-codes';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {
  CURRENT_USER_KEY,
  IS_OPTIONAL_AUTH_KEY,
  IS_PUBLIC_KEY,
} from '../constants/constants';
import { jwtPayloadType } from '../enums/user.enum';
import { ExtendedRequest } from '../interfaces/IExtendRequest';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(
      IS_OPTIONAL_AUTH_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request: ExtendedRequest = context.switchToHttp().getRequest();

    const token = request.cookies?.access_token as string | undefined;

    if (!token) {
      if (isOptionalAuth) {
        return true;
      }

      throw new UnauthorizedException({
        code: ErrorCodes.NO_TOKEN_PROVIDED,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<jwtPayloadType>(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      request[CURRENT_USER_KEY] = payload;

      return true;
    } catch {
      if (isOptionalAuth) {
        return true;
      }

      throw new UnauthorizedException({
        code: ErrorCodes.INVALID_TOKEN,
      });
    }
  }
}
