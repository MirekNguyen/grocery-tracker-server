import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { EnvSchema } from './database/env.resolver';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  EnvSchema.parse(process.env);
  await app.listen(process.env.port ?? 3000, '0.0.0.0');
}
bootstrap();
