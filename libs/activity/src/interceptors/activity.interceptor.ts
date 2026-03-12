import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';

import { TRACK_ACTIVITY } from '../decorators/track-activity.decorator';
import { ActivityService } from '../activity.service';
import { App, Status } from '@prts/common/index';


@Injectable()
export class ActivityInterceptor implements NestInterceptor {

    constructor(
        private reflector: Reflector,
        private activityService: ActivityService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const metadata = this.reflector.get(TRACK_ACTIVITY, context.getHandler());

        if (!metadata) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();

        const { module, action } = metadata;

        return next.handle().pipe(
            tap(async () => {

                await this.activityService.track({
                    traceId: request.traceId,
                    tenantId: request.headers['x-tenant-id'],
                    app: App.PRTS,
                    module,
                    action,
                    endpoint: request.originalUrl,
                    method: request.method,
                    userId: request.user?.id,
                    role: request.user?.role,
                    ipAddress: request.ip,
                    status: Status.SUCCESS,
                    timestamp: new Date().toISOString(),
                });

            }),
        );
    }
}