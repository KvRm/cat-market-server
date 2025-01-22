import { eq, getTableColumns, or } from 'drizzle-orm'
import { users } from '../../db/schema/users'
import { db } from '../../db/setup'

export async function createOne(params: typeof users.$inferInsert) {
  const [{ insertId }] = await db.insert(users).values(params)
  return { id: insertId }
}

export async function updateOne(params: typeof users.$inferInsert & { id: number }) {
  await db.update(users).set(params).where(eq(users.id, params.id))
  return { id: params.id }
}

export async function getOne(params: { id: number }) {
  const { password, ...cols } = getTableColumns(users)

  const user = await db.select(cols).from(users).where(eq(users.id, params.id))
  return user[0]!
}

export async function getOneByLogin(params: { login: string }) {
  const user = await db.select().from(users).where(or(eq(users.phone, params.login), eq(users.email, params.login)))
  return user[0]!
}
