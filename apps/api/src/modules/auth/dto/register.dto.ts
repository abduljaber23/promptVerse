import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Abduljaber',
  })
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'abduljaber@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'SecurePassword123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
