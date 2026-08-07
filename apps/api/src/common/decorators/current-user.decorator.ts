import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CURRENT_USER_KEY } from '../constants/constants';
import { jwtPayloadType } from '../enums/user.enum';
import { ExtendedRequest } from '../interfaces/IExtendRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): jwtPayloadType => {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();

    const payload = request[CURRENT_USER_KEY];

    return payload;
  },
);
