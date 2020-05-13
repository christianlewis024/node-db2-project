// exports.up = function (knex) {
//   return knex.schema.createTable("cars", (tbl) => {
//     tbl.increments();
//     tbl.string("vin", 17).notNullable().unique();
//     tbl.string("make", 255).notNullable();
//     tbl.string("model", 255).notNullable();
//     tbl.integer("mileage", 255).notNullable();
//     tbl.string("transmission", 255);
//     tbl.string("status", 255);
//     tbl.timestamps(true, true); // created_at and updated_at
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTableIfExists("cars");
// };
// bad bad bad
