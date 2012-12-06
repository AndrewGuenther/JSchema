/**
 * Mongo stored procedure that performs database migrations.
 */
var migrate = function(collection, field, value) {
   col = db[collection];

   var tuples = col.find();

   tuples.forEach(function(tuple) {
      tuple[field] = value;
      col.save(tuple);
   });
}

db.system.js.save({_id: 'migrate', value: migrate});
