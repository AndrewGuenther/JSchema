function Schema(schema) {
   this.schema = schema;
};

Schema.isIn = function(arr) {
   return function(val) {
      var found = false;

      arr.forEach( function(elem) {
         if (elem == val) {
            found = true;
         }
      });

      return found;
   };
};

Schema.validate = function validate(schema, obj) {
   if (!("_type" in schema)) {
      throw "Schema type is not present"
   }

   // If the item type is "undef" then ignore it
   if (schema._type == "undef") {
      return;
   }

   // If the item is an array, iterate over it and validate each element
   if ("_singular" in schema && schema._singular == false) {
      if (!Array.isArray(obj)) {
         throw "" + obj + " is not an array";
      }

      schema._singular = true;
      obj.forEach(function(elem) {
         validate(schema, elem);
      });

      return;
   }

   // Validate number
   if (schema._type == "number") {
      if (typeof obj != "number") {
         throw "" + obj + " is not of type number!";
      }

      if (schema._validate) {
         if (!schema._validate(obj)) {
            throw "" + obj + " is invalid for field";
         }
      }

      return;
   }

   // Validate boolean
   if (schema._type == "boolean") {
      if (typeof obj != "boolean") {
         throw "" + obj + " is not of type boolean!";
      }

      if (schema._validate) {
         if (!schema._validate(obj)) {
            throw "" + obj + " is invalid for field";
         }
      }
 
      return;
   }
 
   // Validate string
   if (schema._type == "string") {
      if (typeof obj != "string") {
         throw "" + obj + " is not of type string!";
      }

      if (schema._validate) {
         if (!schema._validate(obj)) {
            throw "" + obj + " is invalid for field";
         }
      }
 
      return;
   } 

   // Validate sub-type
   if (typeof schema._type == "object") {
      subSchema = schema._type;

      // Pass down all overriding attributes
      if ("_required" in schema) { subSchema._required = schema._required; }
      if ("_singular" in schema) { subSchema._singular = schema._singular; }
      if ("_validate" in schema) { subSchema._validate = schema._validate; }

      validate(subSchema, obj);
   }

   // If the schema is set to strict, ensure that no extra keys are present in the object
   if (schema._strict) {
      for (att in obj) {
         if (!schema.att) {
            throw "Attribute " + att + " is not present in the schema!";
         }
      }
   }

   // Iterate over all attributes and recursively validate them
   for (att in schema) {
      // Ignore all attributes starting with an underscore
      if (att[0] == "_") {
         continue;
      }

      // Ensure presence of required attributes
      if (!(att in obj) && schema[att]._required) {
         throw "Required attribute " + att + " not present";
      }

      if (att in obj) {
         validate(schema[att], obj[att]);
      }
   }
}

Schema.prototype.validate = function(obj) {
   return Schema.validate(this.schema, obj);
};
