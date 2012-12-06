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

   if (migration.updateFunction) {
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

   // Add a timestamp.
   migration.timestamp = new Date().getTime();

   // Save the migration in the migrations collection.
   db.migrations.save(migration);
}

db.system.js.save({_id: 'migrate', value: migrate});
