import { sql } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { userTable } from './auth';
import { generateId } from '@/lib/id';

export const art = pgTable('art', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  url: varchar('url', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const artOrder = pgTable('artOrder', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  userId: varchar('user_id')
    .references(() => userTable.id)
    .notNull(),
  payment: varchar('payment', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const ZInsertArtSchema = createInsertSchema(art).omit({
  id: true,
});
export const ZInsertArtOrderSchema = createInsertSchema(artOrder).omit({
  id: true,
});
export const ZSelectArtSchema = createSelectSchema(art).omit({
  id: true,
});
