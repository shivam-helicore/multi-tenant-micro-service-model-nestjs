import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const method = request.method;
        const url = request.originalUrl;

        return next.handle().pipe(
            tap(() => {
                const statusCode = response.statusCode;
                const executionTime = Date.now() - now;
                const traceId = request.traceId
                this.logger.log({
                    traceId,
                    method,
                    url,
                    statusCode,
                    executionTime: `${executionTime}ms`,
                });
            }),
        );
    }
}