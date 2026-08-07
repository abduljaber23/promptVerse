import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CURRENT_USER_KEY } from '../constants/constants';
import { ExtendedRequest } from '../interfaces/IExtendRequest';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: ExtendedRequest): Promise<string> {
    const user = req[CURRENT_USER_KEY];

    if (user?.sub) {
      return Promise.resolve(user.sub);
    }

    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown-device';

    return Promise.resolve(`${ip}-${userAgent}`);
  }
}
