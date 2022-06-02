exports.up = function (knex) {
  return knex.schema.createTable('CrowdTransactions', (t) => {
    t.increments('id').primary().notNullable();
    t.string('paymentId').notNullable();
    t.decimal('amount', 8, 8).notNullable().defaultTo(0);
    t.text('txid');
    t.text('invoice');
    t.enum('status', [0, 1]).defaultTo(0);
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('CrowdTransactions');
};
