var exact = {
   "_type": "string",
   "_validate": JSchema.regex("^.{5}$")
}

var schema = {
   "exact": exact
}

var tests = [{
   "name": "Valid regex",
   "data": "01234",
   "type": "exact"
},
{
   "name": "Invalid regex",
   "fail": true,
   "data": "0123456",
   "type": "exact"
}]
