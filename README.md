# JSchema: A schema language for JSON written in Javascript
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
}

var family = {
   _type: person,
   _singular: false
}
```

#Schema Syntax
##Meta-fields:
###_type:

Represents the field type. This field may contain any standard JS types (```number```, ```boolean```, ```string```, ```object```)

```undef``` tells JSchema to ignore the field.

This value may also be another schema object. In this case, that schema object will be used to validate the field. Any other meta-fields defined will override the embedded ones.

###_required:

A ```boolean``` value indicating whether or not the field is required.

###_singular:

If ```false```, then the field is evaluated as an array and the defined schema is checked against each of its elements.

###_strict:

If ```true```, an error is thrown if there are any fields in the object that are not represented in the schema.

###_validate:

Takes a boolean function. All values are checked against this function for validity.

##Validation functions
A series of validation functions have already been defined to help you quickly define your schema

###JSchema.isIn(arr)

Returns a function that tests whether or not the field value is present in arr

#Usage
```javascript
var validator = new JSchema(schema);

validator(obj);
```
**OR**
```javascript
JSchema.validate(schema, obj);
```