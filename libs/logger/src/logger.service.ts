import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console(),
            ],
        });
    }

    log(message: any) {
        this.logger.info(message);
    }

    error(message: any, trace?: string) {
        this.logger.error({
            message,
            trace,
        });
    }

    warn(message: any) {
        this.logger.warn(message);
    }

    debug(message: any) {
        this.logger.debug(message);
    }

    verbose(message: any) {
        this.logger.verbose(message);
    }
}