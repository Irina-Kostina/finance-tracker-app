import { db } from './connection'

export type TxRow = {
  id?: number
  account_id: string
  date: string
  amount_cents: number
  category: string
  note?: string | null
}

export function list(filters?: { accountId?: string; from?: string; to?: string; category?: string }) {
  const q = db<TxRow>('transactions').select().orderBy('date', 'desc')
  if (filters?.accountId) q.where({ account_id: filters.accountId })
  if (filters?.category) q.where({ category: filters.category })
  if (filters?.from) q.where('date', '>=', filters.from)
  if (filters?.to) q.where('date', '<=', filters.to)
  return q
}

export async function create(tx: TxRow) {
  const [id] = await db<TxRow>('transactions').insert(tx)
  return db<TxRow>('transactions').where({ id }).first()
}
