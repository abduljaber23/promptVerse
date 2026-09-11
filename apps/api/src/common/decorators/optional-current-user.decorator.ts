import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CURRENT_USER_KEY } from '../constants/constants';
import { jwtPayloadType } from '../enums/user.enum';
import { ExtendedRequest } from '../interfaces/IExtendRequest';

// Pendant utilisé avec @OptionalAuth() : contrairement à @CurrentUser(),
// le type reflète honnêtement qu'aucun utilisateur n'est parfois présent.
export const OptionalCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): jwtPayloadType | undefined => {
    const request = context.switchToHttp().getRequest<ExtendedRequest>();

    return request[CURRENT_USER_KEY];
  },
);
