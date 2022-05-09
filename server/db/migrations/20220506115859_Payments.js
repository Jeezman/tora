/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('PaymentTranches', (t) => {
    t.integer('paymentId').notNullable().references('paymentId').inTable('CrowdPayments');
    t.float('amount').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('PaymentTranches');
};
