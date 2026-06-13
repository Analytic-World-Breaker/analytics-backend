import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SubscriptionPlan } from '@prisma/client';

const PLAN_LIMITS = {
  [SubscriptionPlan.FREE]: 10,
  [SubscriptionPlan.BASIC]: 100,
  [SubscriptionPlan.PRO]: 1000,
  [SubscriptionPlan.ENTERPRISE]: Number.MAX_SAFE_INTEGER,
};

@Injectable()
export class UsageGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const usage = await this.prisma.usage.findUnique({
      where: { userId: user.userId },
    });

    if (!usage) {
      // Create usage record if it doesn't exist
      await this.prisma.usage.create({
        data: { userId: user.userId },
      });
      return true;
    }

    const limit = PLAN_LIMITS[user.plan] || PLAN_LIMITS[SubscriptionPlan.FREE];

    if (usage.aiCallsCount >= limit) {
      throw new ForbiddenException('Monthly AI call limit reached for your plan.');
    }

    return true;
  }
}
