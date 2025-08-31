/** @param {import('knex').Knex} knex */
export function up(knex) {
  return knex.schema.createTable('transactions', (t) => {
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
export function down(knex) {
  return knex.schema.dropTable('transactions')
}
