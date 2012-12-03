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
   "data": {},
   "type": "strict"
},
{
   "data": {'a': 1},
   "type": "strict"
},
{
   "data": {'b': 2},
   "type": "strict"
}];
