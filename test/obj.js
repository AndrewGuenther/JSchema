var schema = {
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

var tests = [{"a": 0, "b": 1}, {"a": 0}, {"b": 1}]
