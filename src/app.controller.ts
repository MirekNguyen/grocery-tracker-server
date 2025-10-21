import { FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService, ReceiptType } from './app.service';
import { DRIZZLE_PROVIDER, type DrizzleDatabase } from './database/drizzle.provider';

@Controller()
export class AppController {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: DrizzleDatabase,
    private readonly appService: AppService,
  ) {}

  @Get('groceries')
  getTest() {
    return this.db.query.receipt.findMany();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ReceiptType | null> {
    return await this.appService.getHello(file);
  }
}
