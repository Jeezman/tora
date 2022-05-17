/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Products', (t) => {
    t.increments('productId').primary().notNullable();
    t.integer('storeId').notNullable().references('storeId').inTable('Stores');
    t.string('name').notNullable();
    t.float('amount').notNullable();
    t.text('description').notNullable();
    t.integer('dTimeline').notNullable();
    t.integer('count').notNullable();
    t.text('image');
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Products');
};
