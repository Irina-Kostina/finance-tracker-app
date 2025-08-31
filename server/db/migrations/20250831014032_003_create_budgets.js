/** @param {import('knex').Knex} knex */
exports.up = async function (knex) {
  await knex.schema.createTable('budgets', (t) => {
    t.increments('id').primary()
    t.string('category').notNullable()
    t.integer('limit_cents').notNullable()
    t.integer('year').notNullable()
    t.integer('month').notNullable()          // 0..11
    t.timestamps(true, true)
  })
}
exports.down = async function (knex) {
  await knex.schema.dropTable('budgets')
}
