var migration = {
   "_doc": "Adds an age field.",

   "collection": "migrateTest",

   "update": {
      "person.age": {
         "_type": "number",
         "_required": true,
         "_validate": function(person) {
            return person.age > 0;
         }
      }
   },

   "updateFunction": function(person) {
      // Set default age to 1.
      person.age = 1;

      return person;
   }
};

db.eval("migrate(" + migration.toSource() + ")");
