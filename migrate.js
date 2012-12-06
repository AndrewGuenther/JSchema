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

   // No update function supplied, we're done here.
   if (!migrate.updateFunction) {
      return;
   }

   // Update all existing documents.
   col.find().forEach(function(doc) {
      var updatedVal = migration.updateFunction(doc);

      // Only save the updated document if it is valid.
      if (updatedVal) {
         db.eval("v_insert('" + migration.collection +
          "', " + tojson(updatedVal) + ", '" + migration.dataType + "')");
      }
   });
}

db.system.js.save({_id: 'migrate', value: migrate});
