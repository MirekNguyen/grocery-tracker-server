import { pgTable } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';

export const receipt = pgTable('receipt', {
  id: serial().primaryKey(),
});
