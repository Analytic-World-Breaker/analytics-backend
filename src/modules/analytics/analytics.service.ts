import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AnalyticsService {
  constructor(@InjectQueue('analytics-queue') private analyticsQueue: Queue) {}

  async startAnalysis(fileId: string, projectId: string) {
    const job = await this.analyticsQueue.add('process-data', {
      fileId,
      projectId,
    });
    return { jobId: job.id };
  }
}
