import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { NotificationServiceController } from './controllers/notification-service.controller';
import { NotificationServiceService } from './services/notification-service.service';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [NotificationServiceController],
  providers: [NotificationServiceService],
})
export class NotificationsModule {}

