import { Router } from 'express'
import { z } from 'zod'
import * as Accounts from '../db/accounts'
import { asyncH } from './_async'

const router = Router()

const AccountSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(['checking','savings','credit']),
  balanceCents: z.number().int().default(0),
  color: z.string().optional()
})

router.get('/', asyncH(async (_req, res) => {
  const rows = await Accounts.list()
  // map DB snake_case → API camelCase
  const data = rows.map(r => ({
    id: r.id,
    name: r.name,
    type: r.type as 'checking'|'savings'|'credit',
    balanceCents: r.balance_cents,
    color: r.color ?? undefined
  }))
  res.json(data)
}))

router.post('/', asyncH(async (req, res) => {
  const body = AccountSchema.parse(req.body)
  const created = await Accounts.create({
    id: body.id,
    name: body.name,
    type: body.type,
    balance_cents: body.balanceCents,
    color: body.color ?? null
  })
  res.status(201).json({
    id: created!.id,
    name: created!.name,
    type: created!.type as any,
    balanceCents: created!.balance_cents,
    color: created!.color ?? undefined
  })
}))

export default router
