import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const traceId = req.headers['x-trace-id'] || uuidv4();

        req.traceId = traceId;

        res.setHeader('x-trace-id', traceId);

        next();
    }
}