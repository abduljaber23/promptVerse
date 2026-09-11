import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Headers,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import type { Request } from 'express';
import { PurchasesService } from './purchases.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import type { jwtPayloadType } from '../../common/enums/user.enum';

@Controller({
  path: 'purchases',
  version: '1',
})
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post('checkout-session')
  createCheckoutSession(
    @CurrentUser() payload: jwtPayloadType,
    @Body() dto: CreateCheckoutSessionDto,
  ) {
    return this.purchasesService.createCheckoutSession(
      payload.sub,
      dto.promptId,
    );
  }

  // Stripe ne connaît pas notre cookie de session : route publique, vérifiée
  // par la signature du corps brut plutôt que par un token. Le throttling
  // global est désactivé ici — Stripe peut envoyer plusieurs événements d'un
  // coup et ne doit jamais recevoir un 429.
  @Post('webhook')
  @Public()
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string | undefined,
  ) {
    if (!req.rawBody || !signature) {
      throw new BadRequestException('Missing Stripe signature or body');
    }

    await this.purchasesService.handleWebhookEvent(req.rawBody, signature);

    return { received: true };
  }

  @Get('mine')
  findMyPurchases(@CurrentUser() payload: jwtPayloadType) {
    return this.purchasesService.findMyPurchases(payload.sub);
  }

  @Get('by-session/:sessionId')
  findBySessionId(
    @CurrentUser() payload: jwtPayloadType,
    @Param('sessionId') sessionId: string,
  ) {
    return this.purchasesService.findBySessionId(payload.sub, sessionId);
  }
}
