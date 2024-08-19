import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
})

export const insertPostSchema = createInsertSchema(posts)

export type InsertPost = InferInsertModel<typeof posts>
export type SelectPost = InferSelectModel<typeof posts>
