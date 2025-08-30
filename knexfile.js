// knexfile.js (ESM)
import * as Path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const MIGRATIONS_DIR = Path.join(__dirname, 'server/db/migrations')
const SEEDS_DIR = Path.join(__dirname, 'server/db/seeds')

export default {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, 'server/db/dev.sqlite3'),
    },
    migrations: { directory: MIGRATIONS_DIR },
    seeds: { directory: SEEDS_DIR },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: ':memory:' },
    migrations: { directory: MIGRATIONS_DIR },
    seeds: { directory: SEEDS_DIR },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      // adjust if your host expects a different path
      filename: Path.join(__dirname, 'server/db/prod.sqlite3'),
    },
    migrations: { directory: MIGRATIONS_DIR },
    seeds: { directory: SEEDS_DIR },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },
}
