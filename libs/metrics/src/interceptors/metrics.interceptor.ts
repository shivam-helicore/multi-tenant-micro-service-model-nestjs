import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MetricsService } from '../metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {

    constructor(private readonly metricsService: MetricsService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const method = request.method;
        const route = request.route?.path || request.url;

        const end = this.metricsService.httpRequestDuration.startTimer();

        return next.handle().pipe(
            tap(() => {

                const statusCode = response.statusCode;

                this.metricsService.httpRequestCounter.inc({
                    method,
                    route,
                    status_code: statusCode,
                });

                end({
                    method,
                    route,
                    status_code: statusCode,
                });

            }),
        );
    }
}