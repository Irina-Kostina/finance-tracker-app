/** @param {import('knex').Knex} knex */
export function up(knex) {
  return knex.schema.createTable('goals', (t) => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.integer('target_cents').notNullable()
    t.integer('current_cents').notNullable().defaultTo(0)
    t.timestamps(true, true)
  })
}
export function down(knex) {
  return knex.schema.dropTable('goals')
}
