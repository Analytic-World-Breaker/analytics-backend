import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SubscriptionPlan } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('my-plan')
  async getMyPlan(@GetUser('userId') userId: string) {
    return this.subscriptionsService.getPlan(userId);
  }

  // In a real app, this would be triggered by a Stripe Webhook
  @Post('upgrade')
  async upgradePlan(@GetUser('userId') userId: string, @Body('plan') plan: SubscriptionPlan) {
    return this.subscriptionsService.updatePlan(userId, plan);
  }
}
