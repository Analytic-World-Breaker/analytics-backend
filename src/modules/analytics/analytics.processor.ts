import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { OrchestrationService } from '../orchestration/orchestration.service';

@Processor('analytics-queue')
@Injectable()
export class AnalyticsProcessor extends WorkerHost {
  private readonly logger = new Logger(AnalyticsProcessor.name);

  constructor(private readonly orchestrationService: OrchestrationService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}...`);

    const { fileId, projectId } = job.data;

    await this.orchestrationService.orchestrateTask(fileId, projectId);

    return { success: true, fileId };
  }
}
