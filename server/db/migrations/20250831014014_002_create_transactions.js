/** @param {import('knex').Knex} knex */
exports.up = async function (knex) {
  await knex.schema.createTable('transactions', (t) => {
    t.increments('id').primary()
    t.string('account_id').notNullable()
      .references('id').inTable('accounts').onDelete('CASCADE')
    t.date('date').notNullable()
    t.integer('amount_cents').notNullable()   // negative = expense
    t.string('category').notNullable()
    t.string('note')
    t.timestamps(true, true)
  })
}
exports.down = async function (knex) {
  await knex.schema.dropTable('transactions')
}
