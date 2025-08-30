import path from 'node:path'
import knex, { Knex } from 'knex'

const dbPath = path.resolve('server/db/dev.sqlite3')

export const db: Knex = knex({
  client: 'sqlite3',
  connection: { filename: dbPath },
  useNullAsDefault: true
})
