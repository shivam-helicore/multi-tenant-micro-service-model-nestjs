import { Controller, Get } from '@nestjs/common';
import { ApplicationServiceService } from './application-service.service';

@Controller()
export class ApplicationServiceController {
  constructor(private readonly applicationServiceService: ApplicationServiceService) {}

  @Get()
  getHello(): string {
    return this.applicationServiceService.getHello();
  }
}
