exports.up = function (knex) {
  return knex.schema.alterTable('PaymentsCrowd', (t) => {
    t.string('lnurl');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('PaymentsCrowd');
};
