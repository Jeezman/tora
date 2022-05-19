/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('OrderInvoiceLogs', (t) => {
    t.string('paymentId').notNullable();
    t.text('invoice').notNullable();
    t.text('address').notNullable();
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('OrderInvoiceLogs');
};
