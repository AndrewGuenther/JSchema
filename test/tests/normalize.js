var a = {
   "_type": "string",
   "_validate": function(val) { return true; },
   "_normalize": function(val) { return "test"; }
}

var b = {
   "_type": "string",
   "_singular": false,
   "_validate": function(val) { return true; },
   "_normalize": function(val) { return "test"; }
}

var schema = {
   "a": a,
   "b": b
}

var tests = [{
   "name": "Normalize",
   "data": "string",
   "validate": "test",
   "type": "a"
},
{
   "name": "Normalize array",
   "data": ["a", "b", "c", "d"],
   "validate": ["test", "test", "test", "test"],
   "type": "b"
}]
