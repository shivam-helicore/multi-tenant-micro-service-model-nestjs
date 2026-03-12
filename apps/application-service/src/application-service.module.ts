import { Module } from '@nestjs/common';
import { ApplicationServiceController } from './application-service.controller';
import { ApplicationServiceService } from './application-service.service';

@Module({
  imports: [],
  controllers: [ApplicationServiceController],
  providers: [ApplicationServiceService],
})
export class ApplicationServiceModule {}
