exports.up = function (knex) {
  return knex.schema.createTable('CrowdAddressLogs', (t) => {
    t.increments('id').primary().notNullable();
    t.string('paymentId').notNullable();
    t.float('amount').notNullable().defaultTo(0);
    t.string('address').notNullable();
    t.string('invoice');
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('CrowdAddressLogs');
};
