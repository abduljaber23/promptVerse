import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'abduljaber@gmail.com',
  })
  @IsEmail()
  @MaxLength(250)
  @IsNotEmpty()
  email: string;
}
