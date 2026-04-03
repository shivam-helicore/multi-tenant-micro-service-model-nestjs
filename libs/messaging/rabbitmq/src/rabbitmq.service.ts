import { Injectable } from '@nestjs/common';

import type { RabbitmqOptions } from './rabbitmq.options';

@Injectable()
export class RabbitmqService {
  // Placeholder for a real AMQP connection/channel.
  // Keeping it dependency-free for now.
  constructor(private readonly _options?: RabbitmqOptions) {}

  async publish(_routingKey: string, _payload: unknown): Promise<void> {
    // No-op placeholder.
  }
}

