import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  public openApi: OpenAI;
  private constructor() {
    this.openApi = new OpenAI();
  }
  async getHello(): Promise<string> {
    const response = await this.openApi.responses.create({
      model: 'gpt-5-nano',
      input: 'Write a one-sentence bedtime story about a unicorn.'
    })
    return response.output_text;
  }
}
