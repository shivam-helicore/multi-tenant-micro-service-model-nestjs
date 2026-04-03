import { Controller, Get } from '@nestjs/common';
import { ApplicationServiceService } from '../services/application-service.service';

@Controller()
export class ApplicationServiceController {
  constructor(private readonly applicationServiceService: ApplicationServiceService) {}

  @Get()
  getHello(): string {
    return this.applicationServiceService.getHello();
  }
}

