import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleInit {

    private client: Redis;

    onModuleInit() {
        this.client = new Redis({
            host: REDIS_HOST,
            port: REDIS_PORT,
        });

        console.log('Redis connected');
    }

    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
            return this.client.set(key, value, 'EX', ttl);
        }
        return this.client.set(key, value);
    }

    async get(key: string) {
        return this.client.get(key);
    }

    async del(key: string) {
        return this.client.del(key);
    }

    async expire(key: string, ttl: number) {
        return this.client.expire(key, ttl);
    }

}