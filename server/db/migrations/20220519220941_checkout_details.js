/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('OrderDetails', (t) => {
    t.increments('id').primary().notNullable();
    t.string('orderId').notNullable();
    t.string('email').notNullable();
    t.string('phoneNumber').notNullable();
    t.text('address').notNullable();
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('OrderDetails');
};
