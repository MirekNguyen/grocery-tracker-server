import { relations } from 'drizzle-orm';
import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { receiptItem } from './receipt-item.schema';

export const receipt = pgTable('receipt', {
  id: serial().primaryKey(),
  total: integer('total').notNull(),
  date: doublePrecision('date').notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  storeName: varchar('store_name'),
});

export const receiptRelation = relations(receipt, ({ many }) => ({
  receiptItem: many(receiptItem)
}))
