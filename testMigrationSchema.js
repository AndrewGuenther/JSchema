var schema = {
   "_id":"migrateTest",
   "person": {
      "_type": "object",
      "name": {
         "_type": "string",
         "_required": true
      },
      "age": {
         "_type": "number",
         "_required": true,
         "_validate": function(value) {
            return value > 0;
         }
      },
      "height": {
         "_type": "number",
      }
   }
};

db.schema.save(schema);
