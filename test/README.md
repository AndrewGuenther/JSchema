#Anatomy of a test
```javascript
var number = {
   "_type": "number"
}

var schema = {
   "number": number
}

var tests = [{
   "name": "Valid number",
   "data": 1,
   "type": "number"
},
{
   "name": "Invalid number",
   "fail": true,
   "data": "potato",
   "type": "number"
}]
```

The schema to be used for testing must always be called ```schema``` and all tests must live
in ```tests```.

A test has a ```name```, an object ```data``` to be validated, a ```type``` defining what type
in the schema the test corresponds to, and an optional parameter ```fail``` which indicates whether
the validation should fail (initialized to ```false``` by default).
