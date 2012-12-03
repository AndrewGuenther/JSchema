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
   "data": {"a": 0, "b": 1},
   "type": "obj"
},
{
   "data": {"a": 0},
   "type": "obj"
},
{
   "data": {"b": 1},
   "type": "obj"
}]
