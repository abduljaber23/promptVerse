import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Abduljaber',
  })
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'abduljaber@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The bio of the user',
    example: 'I am a passionate developer with a love for creating innovative solutions. I enjoy working on challenging projects and continuously learning new technologies.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  @IsOptional()
  bio?: string;
}
