import { Request } from 'express';
import { CURRENT_USER_KEY } from '../constants/constants';
import { jwtPayloadType } from '../enums/user.enum';

export interface ExtendedRequest extends Request {
  [CURRENT_USER_KEY]: jwtPayloadType;
}
