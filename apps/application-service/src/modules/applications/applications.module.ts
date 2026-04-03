import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { ApplicationServiceController } from './controllers/application-service.controller';
import { ApplicationServiceService } from './services/application-service.service';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [ApplicationServiceController],
  providers: [ApplicationServiceService],
})
export class ApplicationsModule {}

