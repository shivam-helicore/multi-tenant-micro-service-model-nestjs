import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from '../context/request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {

    use(req: any, res: any, next: () => void) {

        const context = {
            traceId: req.traceId,
            tenantId: req.tenantId,
            userId: req.user?.id
        };

        RequestContext.run(context, () => next());

    }

}