/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('UserDetails', (t) => {
    t.integer('userId').notNullable().references('userId').inTable('Users');
    t.string('firstName');
    t.string('lastName');
    t.string('phoneNumber').unique();
    t.string('country');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('UserDetails');
};
