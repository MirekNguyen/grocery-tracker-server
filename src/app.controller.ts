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
import {
  DRIZZLE_PROVIDER,
  type DrizzleDatabase,
} from './database/drizzle.provider';
import { receipt } from './database/schema/receipt.schema';
import { receiptItem } from './database/schema/receipt-item.schema';

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
    const scannedReceipt = await this.appService.getHello(file);
    if (!scannedReceipt) return null;
    const insertedReceipt = (await this.db.insert(receipt).values({
      ...scannedReceipt,
      date: new Date(scannedReceipt.date),
    }).returning())[0];
    console.log(insertedReceipt);
    const receiptItems = scannedReceipt.items.map((item) => ({
      ...item,
      receiptId: insertedReceipt.id
    }));
    const insertedReceiptItems = await this.db.insert(receiptItem).values(receiptItems).returning();
    console.log(insertedReceiptItems);
    return scannedReceipt;
  }
}
