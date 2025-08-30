/** @type {import('knex').Knex.Config} */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './server/db/dev.sqlite3' },
    useNullAsDefault: true,
    migrations: { directory: './server/db/migrations' },
    seeds: { directory: './server/db/seeds' }
  }
}
