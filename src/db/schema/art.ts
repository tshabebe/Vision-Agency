import { sql } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
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
  artUrl: varchar('artUrl', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  contactInfo: varchar('contactInfo', { length: 256 }).notNull(),
  size: varchar('size', { length: 256 }).notNull(),
  frame: varchar('frame', { length: 256 }).notNull(),
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
