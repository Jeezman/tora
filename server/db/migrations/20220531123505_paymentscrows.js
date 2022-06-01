exports.up = function (knex) {
    return knex.schema.createTable('PaymentsCrowd', (t) => {
      t.increments('id').primary().notNullable();
      t.string('paymentId').notNullable();
      t.string('orderId').notNullable();
      t.float('totalAmount').notNullable().defaultTo(0);
      t.float('paidAmount').notNullable().defaultTo(0);
      t.decimal('amountInBtc', 8, 8).notNullable().defaultTo(0);
      t.integer('paymentPin').notNullable();
      t.dateTime('date_created').notNullable().defaultTo(knex.fn.now());
      t.dateTime('date_updated', true).notNullable().defaultTo(knex.fn.now())
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('PaymentsCrowd');
  };
