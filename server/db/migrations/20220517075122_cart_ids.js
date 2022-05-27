/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('CartId', (t) => {
      t.increments('id').primary().notNullable();
      t.string('cartId').notNullable();
      t.string('buyerUsername').notNullable();
      t.enum('status', ['active', 'closed']).notNullable().defaultTo('active');
      t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('CartId');
  };
