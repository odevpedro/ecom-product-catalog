import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  health() {
    return { status: 'ok', service: 'product-catalog' };
  }

  @Get('live')
  live() {
    return { status: 'alive' };
  }

  @Get('ready')
  ready() {
    return { status: 'ready' };
  }
}
