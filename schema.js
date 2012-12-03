function JSchema(schema) {
   this.schema = schema;
};

JSchema.JSchemaError = function(message) {
   this.name = "JSchemaError";
   this.message = message || "JSchema has encountered an error";
}

JSchema.JSchemaError.prototype = new Error();
JSchema.JSchemaError.prototype.constructor = JSchema.JSchemaError;

JSchema.isIn = function(arr) {
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

JSchema.prototype._validate = function _validate(schema, obj) {
//   print("Validate:")
//   print(JSON.stringify(schema))
//   print(JSON.stringify(obj))

   if (!("_type" in schema)) {
      throw new JSchema.JSchemaError("Schema type is not present");
   }

   // If the item type is "undef" then ignore it
   if (schema._type == "undef") {
      return;
   }

   // If the item is an array, iterate over it and validate each element
   if ("_singular" in schema && schema._singular == false) {
      if (!Array.isArray(obj)) {
         throw new JSchema.JSchemaError(JSON.stringify(obj) + " is not an array");
      }

      schema._singular = true;
      obj.forEach(function(elem) {
         _validate(schema, elem);
      });

      return;
   }

   // Validate number
   if (schema._type == "number") {
      if (typeof obj != "number") {
         throw new JSchema.JSchemaError(JSON.stringify(obj) + " is not of type number!");
      }

      if (schema._validate) {
         if (!schema._validate(obj)) {
            throw new JSchema.JSchemaError(JSON.stringify(obj) + " is invalid for field");
         }
      }

      return;
   }

   // Validate boolean
   if (schema._type == "boolean") {
      if (typeof obj != "boolean") {
         throw new JSchema.JSchemaError(JSON.stringify(obj) + " is not of type boolean!");
      }

      if (schema._validate) {
         if (!schema._validate(obj)) {
            throw new JSchema.JSchemaError(JSON.stringify(obj) + " is invalid for field");
         }
      }
 
      return;
   }
 
   // Validate string
   if (schema._type == "string") {
      if (typeof obj != "string") {
         throw new JSchema.JSchemaError(JSON.stringify(obj) + " is not of type string!");
      }

      if (schema._validate) {
         if (!schema._validate(obj)) {
            throw new JSchema.JSchemaError(JSON.stringify(obj) + " is invalid for field");
         }
      }
 
      return;
   } 

   // Validate object
   if (schema._type == "object") {
      // If the schema is set to strict, ensure that no extra keys are present in the object
      if (schema._strict) {
         for (att in obj) {
            if (!schema[att]) {
               throw new JSchema.JSchemaError("Attribute " + att + " is not present in the schema!");
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
         if (!(att in obj) && "_required" in schema[att] && schema[att]._required) {
            throw new JSchema.JSchemaError("Required attribute " + att + " not present");
         }

         if (att in obj) {
            _validate(schema[att], obj[att]);
         }
      }

      return;
   }

   // Validate custom type
   subSchema = this.schema[schema._type];

   // Pass down all overriding attributes
   if ("_required" in schema) { subSchema._required = schema._required; }
   if ("_singular" in schema) { subSchema._singular = schema._singular; }
   if ("_validate" in schema) { subSchema._validate = schema._validate; }

   _validate(subSchema, obj);
};

JSchema.validate = function (schema, obj, type) {
   validator = new JSchema(schema);

   validator.validate(obj, type);
};

JSchema.prototype.validate = function(obj, type) {
   if (!(type in schema)) {
      throw JSchema.JSchemaError("Type " + type + " is not supported by the schema.");
   }

   this._validate(schema[type], obj);
};
