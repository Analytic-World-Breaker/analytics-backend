import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadsService {
  constructor(private prisma: PrismaService) {}

  async saveFileData(data: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    size: number;
    projectId: string;
  }) {
    return this.prisma.file.create({
      data: {
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        size: data.size,
        projectId: data.projectId,
      },
    });
  }

  async getProjectFiles(projectId: string) {
    return this.prisma.file.findMany({
      where: { projectId },
    });
  }
}
