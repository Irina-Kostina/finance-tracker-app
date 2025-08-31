/** @param {import('knex').Knex} knex */
exports.up = async function (knex) {
  await knex.schema.createTable('accounts', (t) => {
    t.string('id').primary()
    t.string('name').notNullable()
    t.string('type', 16).notNullable()       // 'checking' | 'savings' | 'credit'
    t.integer('balance_cents').notNullable().defaultTo(0)
    t.string('color')
    t.timestamps(true, true)
  })
}
exports.down = async function (knex) {
  await knex.schema.dropTable('accounts')
}
