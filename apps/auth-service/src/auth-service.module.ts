import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { RedisModule } from 'libs/redis/src';

@Module({
  imports: [RedisModule],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule { }
