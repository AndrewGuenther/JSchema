#JSchema: A schema language for JSON written in Javascript
#Sample
```javascript
var person = {
   _type: "object",

   name: {
      _type: "string",
      _required: true
   },
   sex: {
      _type: "string",
      _validate: Schema.isIn(["M", "F"])
   }
};

var family = {
   _type: "person",
   _singular: false
};

var schema = {
   "family": family,
   "person": person
};

var validator = new JSchema(schema);

validator.validate(obj, "family");
```

Here we define the schema for a person and a family and then initialize a new JSchema. We then
attempt to validate ```obj``` as a ```family``` object.

#Schema Syntax
##Schema object
The schema object contains the names of every possible custom type. Each field is the string
which will represent the given type and the value is the schema object which represents it.

##Meta-fields
###_type:
Represents the field type. This field may contain any standard JS types (```number```,
```boolean```, ```string```, ```object```)

```undef``` tells JSchema to ignore the field.

This value may also be another schema object. In this case, that schema object will be used to
validate the field. Any other meta-fields defined will override the embedded ones.

###_required:
A ```boolean``` value indicating whether or not the field is required.

###_singular:
If ```false```, then the field is evaluated as an array and the defined schema is checked against
each of its elements.

###_strict:
If ```true```, an error is thrown if there are any fields in the object that are not represented in
the schema.

###_validate:
Takes a boolean function. All values are checked against this function for validity.

##Validation functions
A series of validation functions have already been defined to help you quickly define your schema

###JSchema.isIn(arr):
Returns a function that tests whether or not the field value is present in arr
