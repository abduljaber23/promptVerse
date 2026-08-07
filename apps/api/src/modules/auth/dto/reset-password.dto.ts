import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    description: 'The new password for the user',
    example: '123456',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the user resetting their password',
    example: '502b9f64-fddf-4fa3-9b04-457f03f9faa5',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'The reset password token sent to the user',
    example: '120b19e687fbdd683278f4cce45ec0450e7279b45ee00becb94a767c6c529f59',
  })
  resetPasswordToken: string;
}
