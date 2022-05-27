/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('CrowdPaymentProducts', (t) => {
      t.integer('paymentId').notNullable().references('paymentId').inTable('CrowdPayments');
      t.integer('productId').notNullable().references('productId').inTable('Products');
      t.integer('storeId').notNullable().references('storeId').inTable('Stores');
      t.float('productAmount').notNullable();
      t.integer('productCount').notNullable();
      t.float('productTotal').notNullable();
      t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('CrowdPaymentProducts');
  };
