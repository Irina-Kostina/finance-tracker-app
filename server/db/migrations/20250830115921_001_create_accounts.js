/** @param {import('knex').Knex} knex */
export function up(knex) {
  return knex.schema.createTable('accounts', (t) => {
    t.string('id').primary()
    t.string('name').notNullable()
    t.string('type', 16).notNullable()
    t.integer('balance_cents').notNullable().defaultTo(0)
    t.string('color')
    t.timestamps(true, true)
  })
}
export function down(knex) {
  return knex.schema.dropTable('accounts')
}
