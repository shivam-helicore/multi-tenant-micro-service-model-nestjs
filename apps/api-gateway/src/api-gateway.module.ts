import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { LoggerService, LoggingInterceptor } from '@prts/logger';
import { HttpExceptionFilter } from '@prts/logger';
import { TraceMiddleware } from '@prts/logger';
import { TenantMiddleware } from '@prts/common/index';
import { RequestContextMiddleware } from '@prts/common/index';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsInterceptor, MetricsService } from '@prts/metrics';

@Module({
  imports: [PrometheusModule.register(),],
  controllers: [ApiGatewayController,],
  providers: [
    ApiGatewayService,
    MetricsService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor
    }
  ],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware, TenantMiddleware, RequestContextMiddleware)
  }
}