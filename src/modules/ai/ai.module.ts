import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiService } from './ai.service';
import { ConversationLog, ConversationLogSchema } from './schemas/conversation-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConversationLog.name, schema: ConversationLogSchema },
    ]),
  ],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
