var a = {
   "_type": "string",
   "_validate": function(val) { return true; },
   "_normalize": function(val) { return "test"; }
}

var schema = {
   "a": a
}

var tests = [{
   "name": "Normalize",
   "data": "string",
   "validate": "test",
   "type": "a"
}]
