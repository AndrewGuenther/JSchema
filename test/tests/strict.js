var strict = {
   "_type": "object",
   "_strict": true,
   "a": {
      "_type": "number",
   }
}

var schema = {
   "strict": strict
}

var tests = [{
   "name": "Valid strict empty object",
   "data": {},
   "type": "strict"
},
{
   "name": "Valid strict object",
   "data": {'a': 1},
   "type": "strict"
},
{
   "name": "Invalid strict object",
   "fail": true,
   "data": {'b': 2},
   "type": "strict"
}];
