var obj = {
   "_type": "object",
   
   "a": {
      "_type": "number",
      "_required": true
   },

   "b": {
      "_type": "number",
      "_required": false
   }
}

var schema = {
   "obj": obj
}

var tests = [{
   "name": "Valid obj",
   "data": {"a": 0, "b": 1},
   "type": "obj"
},
{
   "name": "Valid obj no 'b'",
   "data": {"a": 0},
   "type": "obj"
},
{
   "name": "Invalid obj",
   "fail": true,
   "data": {"b": 1},
   "type": "obj"
}]
