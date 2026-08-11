import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminUsersService } from '../services/admin-users.service';
import { AuthRolesGuard } from '../../../common/guards/auth-roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRoles } from '../../../common/enums/user.enum';
import { UpdateRoleDto } from '../dto/update-role.dto';

@UseGuards(AuthRolesGuard)
@Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
@Controller({
  path: 'admin/users',
  version: '1',
})
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  findAll() {
    return this.adminUsersService.findAll();
  }

  @Get('count')
  countAll() {
    return this.adminUsersService.countAll();
  }

  @Roles(UserRoles.SUPER_ADMIN)
  @Patch(':userId/make-role')
  async makeRole(
    @Param('userId') userId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.adminUsersService.makeRole(userId, updateRoleDto.role);
  }
}
