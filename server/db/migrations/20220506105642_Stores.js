/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Stores', (t) => {
    t.increments('storeId').primary().notNullable();
    t.integer('userId').notNullable().references('userId').inTable('Users');
    t.string('name').notNullable().unique();
    t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Stores');
};
