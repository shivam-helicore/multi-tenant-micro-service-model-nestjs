import { Module } from '@nestjs/common';
import { ActivityModule } from '@prts/activity';

@Module({
  imports: [ActivityModule],
  exports: [ActivityModule],
})
export class AuditModule {}

