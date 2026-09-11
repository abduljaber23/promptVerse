import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { IS_OPTIONAL_AUTH_KEY } from '../constants/constants';

// Comme @Public(), mais AuthGuard tente quand même de décoder le cookie s'il
// est présent : un token absent/invalide n'est plus une 401, `request.user`
// reste simplement `undefined`. Utile pour les routes publiques qui doivent
// néanmoins savoir "qui demande" (ex : contenu payant visible par l'acheteur).
export const OptionalAuth = (): CustomDecorator =>
  SetMetadata(IS_OPTIONAL_AUTH_KEY, true);
