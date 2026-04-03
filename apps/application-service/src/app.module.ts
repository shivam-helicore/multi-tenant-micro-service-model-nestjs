import { Module } from '@nestjs/common';
import { ApplicationsModule } from './modules/applications/applications.module';

@Module({
  imports: [ApplicationsModule],
})
export class AppModule {}

