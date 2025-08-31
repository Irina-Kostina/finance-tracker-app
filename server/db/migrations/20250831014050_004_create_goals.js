/** @param {import('knex').Knex} knex */
exports.up = async function (knex) {
  await knex.schema.createTable('goals', (t) => {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.integer('target_cents').notNullable()
    t.integer('current_cents').notNullable().defaultTo(0)
    t.timestamps(true, true)
  })
}
exports.down = async function (knex) {
  await knex.schema.dropTable('goals')
}
