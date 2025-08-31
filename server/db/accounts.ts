import { db } from './connection'

export type AccountRow = {
  id: string
  name: string
  type: string
  balance_cents: number
  color?: string | null
}

export function list() {
  return db<AccountRow>('accounts').select()
}

export function get(id: string) {
  return db<AccountRow>('accounts').where({ id }).first()
}

export async function create(row: AccountRow) {
  await db<AccountRow>('accounts').insert(row)
  return get(row.id)
}

export async function update(id: string, patch: Partial<AccountRow>) {
  await db<AccountRow>('accounts').where({ id }).update(patch)
  return get(id)
}

export function remove(id: string) {
  return db<AccountRow>('accounts').where({ id }).del()
}
