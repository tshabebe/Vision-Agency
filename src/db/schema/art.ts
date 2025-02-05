import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { generateId } from '@/lib/id';
import { userTable } from './auth';

export const artOrder = pgTable('artOrder', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  artId: varchar('art_id', { length: 256 })
    .references(() => uploadFile.id)
    .notNull(),
  userId: varchar('user_id')
    .references(() => userTable.id)
    .notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  status: varchar('status', {
    enum: ['order', 'confirm', 'delivered'],
  })
    .default('order')
    .notNull(),
  contactInfo: varchar('contactInfo', { length: 256 }).notNull(),
  size: varchar('size', { length: 256 }).notNull(),
  frame: varchar('frame', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const uploadFile = pgTable('upload_file', {
  id: varchar('id', { length: 30 })
    .$defaultFn(() => generateId())
    .primaryKey(), // prefix_ + nanoid (12)
  artUrl: varchar('artUrl', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export const artOrderRelations = relations(artOrder, ({ one }) => ({
  uploadFile: one(uploadFile, {
    fields: [artOrder.artId],
    references: [uploadFile.id],
  }),
  user: one(userTable, {
    fields: [artOrder.userId],
    references: [userTable.id],
  }),
}));

export const uploadFileRelations = relations(uploadFile, ({ many }) => ({
  artOrders: many(artOrder),
}));

export const ZInsertUploadFiletSchema = createInsertSchema(uploadFile).omit({
  id: true,
});

export const ZInsertArtOrderSchema = createInsertSchema(artOrder).omit({
  id: true,
});

export const ZSelectArtOrderSchema = createSelectSchema(artOrder).omit({});
