import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SubscriptionPlan } from '@prisma/client';

@ApiTags('subscriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('my-plan')
  @ApiOperation({ summary: 'Get current user subscription plan' })
  async getMyPlan(@GetUser('id') userId: string) {
    return this.subscriptionsService.getPlan(userId);
  }

  // In a real app, this would be triggered by a Stripe Webhook
  @Post('upgrade')
  @ApiOperation({ summary: 'Upgrade user subscription plan' })
  async upgradePlan(@GetUser('id') userId: string, @Body('plan') plan: SubscriptionPlan) {
    return this.subscriptionsService.updatePlan(userId, plan);
  }
}
