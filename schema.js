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

JSchema.regex = function(re) {
   var regex = new RegExp(re);

   return function(val) {
      return regex.test(val);
   };
};

JSchema.notEmpty = function(str) {
    return str.length > 0;
};

//Inclusive
JSchema.inRange = function(min, max) {
   return function(val) {
       return (val >= min && val <= max);
   };
};

JSchema._validate = function _validate(desc, schema, obj) {
//   print("Validate:")
//   print(JSON.stringify(schema))
//   print(JSON.stringify(obj))

   if (!("_type" in schema)) {
      throw new JSchema.JSchemaError("Schema type is not present");
   }

   // If the item type is "undef" then ignore it
   if (schema._type == "undef") {
      return obj;
   }

   // If the item is an array, iterate over it and validate each element
   if ("_singular" in schema && schema._singular == false) {
      if (!(obj instanceof Array)) {
         throw new JSchema.JSchemaError(JSON.stringify(obj) + " is not an array");
      }

      schema._singular = true;
      obj.forEach(function(elem) {
         _validate(desc, schema, elem);
      });

      return obj;
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
         if ("_normalize" in schema) {
            obj = schema._normalize(obj);
         }
      }

      return obj;
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
         if ("_normalize" in schema) {
            obj = schema._normalize(obj);
         }
      }
 
      return obj;
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
         if ("_normalize" in schema) {
            obj = schema._normalize(obj);
         }
      }
 
      return obj;
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
            _validate(desc, schema[att], obj[att]);
         }
      }

      return obj;
   }

   // Validate custom type
   subSchema = desc[schema._type];

   // Pass down all overriding attributes
   if ("_required" in schema) { subSchema._required = schema._required; }
   if ("_singular" in schema) { subSchema._singular = schema._singular; }
   if ("_validate" in schema) { subSchema._validate = schema._validate; }

   return _validate(desc, subSchema, obj);
};

JSchema.validate = function (schema, obj, type) {
   if (!(type in schema)) {
      throw JSchema.JSchemaError("Type " + type + " is not supported by the schema.");
   }

   return JSchema._validate(schema, schema[type], obj);
};

JSchema.prototype.validate = function(obj, type) {
   return JSchema.validate(this.schema, obj, type);
};
