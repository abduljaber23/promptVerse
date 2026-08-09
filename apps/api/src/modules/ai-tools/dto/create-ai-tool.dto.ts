import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAiToolDto {
  @ApiProperty({
    description: 'The name of the AI tool',
    example: 'ChatGPT',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
