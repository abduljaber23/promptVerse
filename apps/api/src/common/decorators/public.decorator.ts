import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/constants';

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
