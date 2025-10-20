import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService, GroceryItem } from './app.service';
import { FileInterceptor } from '@nest-lab/fastify-multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('groceries')
  getTest() {
    return [
      { id: 1, name: 'Apples', type: 'Fruit', price: 25.5, quantiy: 3 },
      { id: 2, name: 'Milk', type: 'Dairy', price: 12.8, quantiy: 1 },
    ];
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<GroceryItem | null> {
    return await this.appService.getHello(file);
  }
}
