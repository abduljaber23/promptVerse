import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ErrorCodes } from '../errors/error-codes';
import { Reflector } from '@nestjs/core';
import { CURRENT_USER_KEY } from '../constants/constants';
import { UserRoles } from '../enums/user.enum';
import { ExtendedRequest } from '../interfaces/IExtendRequest';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return true;
    }

    const request: ExtendedRequest = context.switchToHttp().getRequest();

    const user = request[CURRENT_USER_KEY];

    if (!user) {
      return false;
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException({
        code: ErrorCodes.ACCESS_DENIED,
      });
    }

    return true;
  }
}
