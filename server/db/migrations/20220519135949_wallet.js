/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('UserWallet', (t) => {
    t.increments('id').primary().notNullable();
    t.integer('userId').notNullable().references('userId').inTable('Users');
    t.float('balance').notNullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('UserWallet');
};
