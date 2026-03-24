import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsService {

    httpRequestCounter = new Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'route', 'status_code'],
    });

    httpRequestDuration = new Histogram({
        name: 'http_request_duration_seconds',
        help: 'Duration of HTTP requests',
        labelNames: ['method', 'route', 'status_code'],
    });

}