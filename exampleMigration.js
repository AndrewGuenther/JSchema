var migration = {
   "_doc": "Adds an age field.",

   "collection": "migrateTest",

   "dataType" : "person",

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
      // Set default age to twice the length of their name.
      person.age = person.name.length * 2;

      return person;
   }
};

db.eval("migrate(" + migration.toSource() + ")");
