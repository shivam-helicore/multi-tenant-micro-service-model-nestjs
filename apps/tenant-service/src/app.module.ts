import { Module } from '@nestjs/common';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [TenantsModule],
})
export class AppModule {}

