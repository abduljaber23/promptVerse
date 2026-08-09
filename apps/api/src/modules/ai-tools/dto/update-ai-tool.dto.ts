import { PartialType } from '@nestjs/swagger';
import { CreateAiToolDto } from './create-ai-tool.dto';

export class UpdateAiToolDto extends PartialType(CreateAiToolDto) {}
