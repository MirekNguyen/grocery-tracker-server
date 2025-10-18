import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('groceries')
  getTest() {
    return [
      { id: 1, name: 'Apples', type: 'Fruit', price: 25.5, quantiy: 3 },
      { id: 2, name: 'Milk', type: 'Dairy', price: 12.8, quantiy: 1 },
    ];
  }
}
