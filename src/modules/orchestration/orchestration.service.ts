import { Injectable, Logger } from '@nestjs/common';
import { AnalyticsGateway } from '../../sockets/analytics.gateway';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class OrchestrationService {
  private readonly logger = new Logger(OrchestrationService.name);

  constructor(
    private readonly analyticsGateway: AnalyticsGateway,
    private readonly prisma: PrismaService,
  ) {}

  async orchestrateTask(fileId: string, projectId: string) {
    this.logger.log(`Starting orchestration for File: ${fileId} in Project: ${projectId}`);

    // 1. Notify Frontend - Started
    this.analyticsGateway.sendAnalysisUpdate(projectId, {
      status: 'PROCESSING',
      message: 'Orchestration started, identifying optimal tools...',
      fileId,
    });

    try {
      // 2. Fetch File Metadata
      const file = await this.prisma.file.findUnique({ where: { id: fileId } });
      if (!file) throw new Error('File not found');

      // 3. Routing Logic (Simplified for now)
      // In a real scenario, this would check file type/content and route to OpenAI or Python
      this.logger.log(`Routing ${file.fileName} to appropriate processing unit...`);

      this.analyticsGateway.sendAnalysisUpdate(projectId, {
        status: 'PROCESSING',
        message: `Analyzing ${file.fileType} data...`,
        fileId,
      });

      // 4. Simulate Processing delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 5. Update Status in DB
      await this.prisma.file.update({
        where: { id: fileId },
        data: { status: 'COMPLETED' },
      });

      // 6. Final Notification
      this.analyticsGateway.sendAnalysisUpdate(projectId, {
        status: 'COMPLETED',
        message: 'Analysis complete!',
        fileId,
        results: {
          summary: "This is a simulated analysis result from the orchestration layer.",
          chartData: [10, 20, 30, 40]
        }
      });

    } catch (error) {
      this.logger.error(`Orchestration failed: ${error.message}`);
      this.analyticsGateway.sendAnalysisUpdate(projectId, {
        status: 'FAILED',
        message: error.message,
        fileId,
      });
    }
  }
}
