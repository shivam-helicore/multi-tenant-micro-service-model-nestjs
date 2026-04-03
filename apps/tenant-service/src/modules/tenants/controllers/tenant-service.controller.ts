import { Controller, Get } from '@nestjs/common';
import { TenantServiceService } from '../services/tenant-service.service';

@Controller()
export class TenantServiceController {
  constructor(private readonly tenantServiceService: TenantServiceService) {}

  @Get()
  getHello(): string {
    return this.tenantServiceService.getHello();
  }
}

