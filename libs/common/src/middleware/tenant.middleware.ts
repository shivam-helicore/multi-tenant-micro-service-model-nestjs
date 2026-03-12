import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Headers } from '../constants/headers.constants';

@Injectable()
export class TenantMiddleware implements NestMiddleware {

    use(req: any, res: any, next: () => void) {

        const tenantId = req.headers[Headers.TENANT_ID];

        if (!tenantId) {
            throw new BadRequestException('Tenant ID header missing');
        }

        req.tenantId = tenantId;

        next();
    }

}