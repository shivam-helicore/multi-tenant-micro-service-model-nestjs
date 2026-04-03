import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { TenantServiceController } from './controllers/tenant-service.controller';
import { TenantServiceService } from './services/tenant-service.service';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [TenantServiceController],
  providers: [TenantServiceService],
})
export class TenantsModule {}

