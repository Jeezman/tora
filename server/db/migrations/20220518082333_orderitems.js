/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('OrderItems', (t) => {
    t.increments('id').primary().notNullable();
    t.string('orderId').notNullable();
    t.integer('productId')
      .notNullable()
      .references('productId')
      .inTable('Products');
    t.string('user').notNullable();
    t.float('itemAmount').notNullable();
    t.integer('itemCount').notNullable();
    t.float('itemTotal').notNullable();
    t.integer('storeId');
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('OrderItems');
};
