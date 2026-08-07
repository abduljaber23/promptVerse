import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../enums/user.enum';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
