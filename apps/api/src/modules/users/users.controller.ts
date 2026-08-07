import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { jwtPayloadType } from '../../common/enums/user.enum';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('access_token')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() payload: jwtPayloadType) {
    return this.usersService.currentUser(payload.sub);
  }
}
