import { Module } from '@nestjs/common';
import { UserServiceController } from './controllers/user-service.controller';
import { UserServiceService } from './services/user-service.service';

@Module({
  imports: [],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UsersModule {}

