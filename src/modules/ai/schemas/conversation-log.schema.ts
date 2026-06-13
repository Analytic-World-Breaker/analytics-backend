import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ConversationLog extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  prompt: string;

  @Prop({ required: true })
  response: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop()
  modelUsed: string;

  @Prop()
  tokensUsed: number;
}

export const ConversationLogSchema = SchemaFactory.createForClass(ConversationLog);
