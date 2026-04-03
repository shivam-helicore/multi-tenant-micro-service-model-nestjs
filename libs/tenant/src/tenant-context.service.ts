import { Injectable } from '@nestjs/common';
import { RequestContext } from '@prts/common/index';

@Injectable()
export class TenantContextService {
  getTenantId(): string | undefined {
    return RequestContext.getTenantId();
  }
}

