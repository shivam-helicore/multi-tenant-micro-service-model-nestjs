import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from '../services/auth-service.service';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Get()
  getHello(): string {
    return this.authServiceService.getHello();
  }
}

