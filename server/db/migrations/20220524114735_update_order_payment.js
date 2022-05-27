/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('OrderPayments', (t) => {
    t.enum('status', ['pending', 'failed', 'settled'])
      .notNullable()
      .defaultTo('pending');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('OrderPayments');
};
