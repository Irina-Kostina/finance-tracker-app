import { Router } from 'express'
import { z } from 'zod'
import * as Tx from '../db/transactions'
import { asyncH } from './_async'

const router = Router()

const CreateTx = z.object({
  accountId: z.string().min(1),
  date: z.string().min(1),        // ISO yyyy-mm-dd
  amountCents: z.number().int(),  // negative for expense
  category: z.string().min(1),
  note: z.string().optional()
})

router.get('/', asyncH(async (req, res) => {
  const { accountId, from, to, category } = req.query
  const rows = await Tx.list({
    accountId: accountId as string | undefined,
    from: from as string | undefined,
    to: to as string | undefined,
    category: category as string | undefined,
  })
  res.json(rows.map(r => ({
    id: r.id!,
    accountId: r.account_id,
    date: r.date,
    amountCents: r.amount_cents,
    category: r.category,
    note: r.note ?? undefined
  })))
}))

router.post('/', asyncH(async (req, res) => {
  const body = CreateTx.parse(req.body)
  const inserted = await Tx.create({
    account_id: body.accountId,
    date: body.date,
    amount_cents: body.amountCents,
    category: body.category,
    note: body.note ?? null
  })
  res.status(201).json({
    id: inserted!.id!,
    accountId: inserted!.account_id,
    date: inserted!.date,
    amountCents: inserted!.amount_cents,
    category: inserted!.category,
    note: inserted!.note ?? undefined
  })
}))

export default router
