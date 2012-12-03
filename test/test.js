var s = new JSchema(schema)
var success;

tests.forEach(function(elem) {
   success = false;

   try {
      s.validate(elem.data, elem.type);
      success = true;
   } catch (err if err instanceof JSchema.JSchemaError) {
      if ("fail" in elem && elem.fail) {
         success = true;
      } else {
         print(err.message);
      }
   } catch (e) {
      print(JSON.stringify(e));
   }finally {
      if (success) {
//         print("Test"+elem.name+" passed!");
      } else {
         print("Test '"+elem.name+"' failed!");
         print("Schema:")
         print("\t"+JSON.stringify(schema));
         print("Elem:")
         print("\t"+JSON.stringify(elem));
      }
   }
});

