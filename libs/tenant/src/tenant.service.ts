import { Injectable } from '@nestjs/common';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class TenantService {
  constructor(private readonly tenantContext: TenantContextService) {}

  getTenantId(): string | undefined {
    return this.tenantContext.getTenantId();
  }
}

