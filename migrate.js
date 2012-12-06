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
      var updatedVal = migration.updateFunction(doc);

      db.eval("v_insert('" + migration.collection +
       "', " + tojson(updatedVal) + ", '" + migration.dataType + "')");
   });
}

db.system.js.save({_id: 'migrate', value: migrate});
