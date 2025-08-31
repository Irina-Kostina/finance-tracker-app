/** @param {import('knex').Knex} knex */
export function up(knex) {
  return knex.schema.createTable('budgets', (t) => {
    t.increments('id').primary()
    t.string('category').notNullable()
    t.integer('limit_cents').notNullable()
    t.integer('year').notNullable()
    t.integer('month').notNullable()
    t.timestamps(true, true)
  })
}
export function down(knex) {
  return knex.schema.dropTable('budgets')
}
