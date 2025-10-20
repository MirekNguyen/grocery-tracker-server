import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { zodTextFormat } from "openai/helpers/zod";
import z from 'zod/v3';

const ImageAnalyze = z.object({
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  description: z.string(),
});

export type GroceryItem = z.infer<typeof ImageAnalyze>

@Injectable()
export class AppService {
  public openAi: OpenAI;
  constructor() {
    this.openAi = new OpenAI();
  }
  async getHello(file: Express.Multer.File): Promise<GroceryItem | null> {
    const mimeType = file.mimetype;
    const base64Image = file.buffer.toString('base64');
    const response = await this.openAi.responses.parse({
      model: 'gpt-5-nano',
      input: [
        {
          role: 'system',
          content: 'Return only valid JSON that matches the schema.',
        },
        {
          role: 'user',
          content: [
            { type: 'input_text', text: "what's in this image?" },
            {
              type: 'input_image',
              image_url: `data:${mimeType};base64,${base64Image}`,
              detail: 'auto',
            },
          ],
        },
      ],
      text: {
        format: zodTextFormat(ImageAnalyze, 'food_analysis'),
      },
    });
    return response.output_parsed;
  }
}
