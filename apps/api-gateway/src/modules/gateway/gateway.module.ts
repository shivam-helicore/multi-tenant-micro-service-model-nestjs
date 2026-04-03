import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { LoggerService, LoggingInterceptor } from '@prts/logger';
import { HttpExceptionFilter, TraceMiddleware } from '@prts/logger';
import { MetricsInterceptor, MetricsService } from '@prts/metrics';
import { TenantMiddleware, RequestContextMiddleware } from '@prts/tenant';

import { GatewayController } from './controllers/gateway.controller';
import { GatewayService } from './services/gateway.service';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [GatewayController],
  providers: [
    GatewayService,
    MetricsService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware, TenantMiddleware, RequestContextMiddleware);
  }
}

