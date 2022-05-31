exports.up = function (knex) {
  return knex.schema.alterTable('PaymentsCrowd', (t) => {
    t.integer('paymentPin').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('PaymentsCrowd');
};
