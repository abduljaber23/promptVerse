import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';

export class CreateAiToolDto {
  @ApiProperty({
    description: 'The name of the AI tool',
    example: 'ChatGPT',
  })
  @IsString()
  name: string;
}
