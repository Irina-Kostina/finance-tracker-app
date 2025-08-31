import 'dotenv/config'
import express from 'express'
import cors from 'cors'

// import accountsRouter from './routes/accounts'
// import transactionsRouter from './routes/transactions'
// import budgetsRouter from './routes/budgets'
// import goalsRouter from './routes/goals'

const app = express()

app.use(cors({ origin: 'http://localhost:5173' })) // allow your Vite dev server
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// app.use('/api/accounts', accountsRouter)
// app.use('/api/transactions', transactionsRouter)
// app.use('/api/budgets', budgetsRouter)
// app.use('/api/goals', goalsRouter)

// generic error handler (last)
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err)
  res.status(err?.status || 500).json({ error: err?.message ?? 'Server error' })
})

export default app
