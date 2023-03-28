import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): string {
    return 'zs最帅';
  }
  getDetail(): string {
    return `${Date.now()}`;
  }
}
