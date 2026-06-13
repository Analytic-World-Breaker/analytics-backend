import { Module, Global } from '@nestjs/common';
import { AnalyticsGateway } from './analytics.gateway';

@Global()
@Module({
  providers: [AnalyticsGateway],
  exports: [AnalyticsGateway],
})
export class SocketsModule {}
