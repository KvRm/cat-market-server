import { asc, desc } from 'drizzle-orm'
import * as t from 'drizzle-orm/mysql-core'

export const schemaHelper = {
  timestamps: {
    updatedAt: t.timestamp('updated_at').onUpdateNow(),
    createdAt: t.timestamp('created_at').defaultNow().notNull(),
  },
}

export function getOrderFn(order: 'ASC' | 'DESC') {
  return order === 'ASC' ? asc : desc
}
