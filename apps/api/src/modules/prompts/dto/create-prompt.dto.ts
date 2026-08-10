import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePromptDto {
  @ApiProperty({
    description: 'The title of the prompt',
    example: 'Photorealistic cyberpunk city generator',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  title: string;

  @ApiProperty({
    description: 'The actual prompt instructions/content',
    example:
      'Generate a high-detail 8k cyberpunk city street at night with neon lights...',
  })
  @IsString()
  @IsNotEmpty()
  promptContent: string;

  @ApiPropertyOptional({
    description: 'A preview or explanation of the prompt output result',
    example:
      'A futuristic cityscape with flying vehicles and glowing holographic signs.',
  })
  @IsString()
  @IsOptional()
  previewResult?: string;

  @ApiProperty({
    description: 'Price of the prompt in euros',
    example: 9.99,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(99.99)
  price: number;

  @ApiProperty({
    description: 'The Category UUID this prompt belongs to',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: 'The AI Tool UUID this prompt is optimized for',
    example: 'b1ffcd88-8b0a-3ef7-aa5c-5aa8ac270b22',
  })
  @IsUUID()
  @IsNotEmpty()
  aiToolId: string;
}
