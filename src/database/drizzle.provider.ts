import { ConfigService } from '@nestjs/config';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from './drizzle.schema';
import { EnvSchema } from './env.resolver';

export const DRIZZLE_ASYNC_PROVIDER = Symbol('DRIZZLE_PROVIDER');
export const DrizzleProvider = [
  {
    provide: DRIZZLE_ASYNC_PROVIDER,
    inject: [ConfigService],
    useFactory: (): PostgresJsDatabase<typeof schema> => {
      const env = EnvSchema.parse(process.env);
      const client = postgres(env.DATABASE_URL);
      return drizzle(client, {
        schema: schema,
      });
    },
    exports: DRIZZLE_ASYNC_PROVIDER,
  },
];
