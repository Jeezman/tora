/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Transactions', (t) => {
    t.increments('id').primary().notNullable();
    t.integer('userId')
      .notNullable()
      .references('userId')
      .inTable('Users');
    t.integer('amount').notNullable();
    t.text('txid');
    t.text('lninvoice');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Transactions');
};
