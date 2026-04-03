import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

