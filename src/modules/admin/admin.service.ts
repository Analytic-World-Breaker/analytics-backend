import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getSystemStats() {
    const userCount = await this.prisma.user.count();
    const projectCount = await this.prisma.project.count();
    const totalAiCalls = await this.prisma.usage.aggregate({
      _sum: { aiCallsCount: true },
    });

    return {
      userCount,
      projectCount,
      totalAiCalls: totalAiCalls._sum.aiCallsCount || 0,
    };
  }

  async getUserUsage(userId: string) {
    return this.prisma.usage.findUnique({
      where: { userId },
    });
  }
}
