import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AnalyticsService } from './analytics.service';
import { AnalyticsProcessor } from './analytics.processor';
import { OrchestrationModule } from '../orchestration/orchestration.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'analytics-queue',
    }),
    OrchestrationModule,
  ],
  providers: [AnalyticsService, AnalyticsProcessor],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
