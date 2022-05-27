/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Carts', (t) => {
    t.string('cartId').notNullable();
    t.integer('productId')
      .notNullable()
      .references('productId')
      .inTable('Products');
    t.string('buyerPubKey');
    t.string('buyerUsername');
    t.float('amount').notNullable();
    t.integer('itemCount').notNullable();
    t.float('total').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Carts');
};
