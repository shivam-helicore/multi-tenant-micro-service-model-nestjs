import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { RedisModule } from '@prts/cache/redis';

import { AuthServiceController } from './controllers/auth-service.controller';
import { AuthServiceService } from './services/auth-service.service';

@Module({
  imports: [RedisModule, PrometheusModule.register()],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthModule {}

