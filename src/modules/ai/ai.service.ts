import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationLog } from './schemas/conversation-log.schema';

@Injectable()
export class AiService {
  constructor(
    @InjectModel(ConversationLog.name) private conversationLogModel: Model<ConversationLog>,
  ) {}

  async logConversation(data: {
    userId: string;
    projectId: string;
    prompt: string;
    response: string;
    modelUsed: string;
    tokensUsed?: number;
    metadata?: any;
  }) {
    const newLog = new this.conversationLogModel(data);
    return newLog.save();
  }

  async getProjectLogs(projectId: string) {
    return this.conversationLogModel.find({ projectId }).sort({ createdAt: -1 }).exec();
  }
}
