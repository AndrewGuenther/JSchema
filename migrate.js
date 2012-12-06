/**
 * Mongo stored procedure that performs database migrations.
 */
var migrate = function(migration) {
   var col = db[migration.collection];

   // Update the schema.
   db.schema.update(
      {_id: migration.collection},
      {$set: migration.update}
   );

   // Update all existing documents.
   col.find().forEach(function(doc) {
      col.save(migration.updateFunction(doc));
   });
}

db.system.js.save({_id: 'migrate', value: migrate});
