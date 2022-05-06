/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('ProductSales', (t) => {
      t.integer('storeId').notNullable().references('storeId').inTable('Stores');
      t.integer('productId').notNullable().references('productId').inTable('Products');
      t.string('buyerPubKey');
      t.string('buyerUsername');
      t.float('amount').notNullable();
      t.integer('count').notNullable();
      t.float('total').notNullable();
      t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('ProductSales');
  };
