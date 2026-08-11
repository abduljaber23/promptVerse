import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../../../common/enums/user.enum';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'The new role to assign to the user',
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: string;
}
