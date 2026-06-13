import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Analytics World Breaker (AI) Backend Running...';
  }
}
