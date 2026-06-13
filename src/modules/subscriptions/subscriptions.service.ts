import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SubscriptionPlan } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async updatePlan(userId: string, plan: SubscriptionPlan) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { plan },
    });
  }

  async getPlan(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    });
    return user?.plan;
  }
}
